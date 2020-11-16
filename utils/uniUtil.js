import authHttp from './http/authHttp'
import abortAllRequest from './http/basicHttp'
import {isAllRequestOver} from './http/basicHttp'
import {Bus, sendApp, xtyStorage} from '../utils/index'
const uniUtil = {
  getSystemInfoSync() {
    var resInfo = uni.getSystemInfo()
    var res = uni.getSystemInfoSync()
    var systemInfo = {}
    try {
      systemInfo = {
        model: res.model,
        pixelRatio: res.pixelRatio,
        windowWidth: res.windowWidth,
        windowHeight: res.windowHeight,
        language: res.language,
        version: res.version,
        platform: res.platform,
        system: res.system,
        sysVersion: null
      }
      // 当前设备是否是平板通过计算设备显示的 PPI 值来计算，
      // 如 Apple New iPad 9.7英寸 2048x1536分辨率的 PPI 为 264，手机 5.3英寸 1280x720分辨率的 PPI 为 277
      let trimmedSystem = systemInfo.system.trim()
      let lastSpaceIdx = trimmedSystem.lastIndexOf(' ')
      if (lastSpaceIdx > 0) {
        systemInfo.system = trimmedSystem.substr(0, lastSpaceIdx)
        systemInfo.sysVersion = trimmedSystem.substr(lastSpaceIdx + 1)
      }
  
    } catch (e) {
  
    }
    var loginLog = {
      City: null, // 登录所在城市（需要请求用户授权获取手机定位）
      Province: null, // 登录所在省份（需要请求用户授权获取手机定位）
      Country: null, // 登录所在国家（需要请求用户授权获取手机定位）
      Language: null, // 浏览的语言风格 
      ThirdAppType: 1, // 第三方登录凭证类型（剧汇王朝用户登录时为空） = ['微信小程序' = 1, '其他' = 999], 使用数值，避免变更名称后出错
      SourceType: '小程序', // 登陆渠道 = ['Web', '小程序', 'App', '微信公众号', '其它']
      DeviceType: 'CellPhone', // 登录设备类型 = ['PC', 'Pad', 'CellPhone']
      Sysetm: null, // 客户机系统类型 
      SysVersion: null, // 客户机系统版本 
      Platform: null, // 产品寄宿的平台 
      PFMVersion: null, // 产品寄宿的平台的版本 
      ProductVersion: '0.0.1.1', // 产品版本与POMS版本一样
    }
    loginLog.Sysetm = systemInfo.system || null // 操作系统，如 iOS, Android
    loginLog.SysVersion = systemInfo.sysVersion || null // 操作系统，如 iOS 的 10.0.1，Android 的 5.0
    // loginLog.Platform = (systemInfo.platform == 'android' ? 'WeChat' : systemInfo.platform) // 小程序客户端平台名称（小程序开发工具为 devtools，手机微信客户端为）
    loginLog.Platform = 'WeChat'
    loginLog.PFMVersion = systemInfo.version || null // 微信版本号
    loginLog.Language = systemInfo.language || 'zh_CN'
    loginLog.ProductVersion = version || '0.0.1.1'
    return {
      systemInfo: systemInfo,
      loginLog: loginLog
    }
  },
  requestData(url, params, method) {
    return new Promise((resolve, reject) => {
      if (typeof method === 'undefined') {
        method = 'POST'
      }
      if (method.toUpperCase() === 'GET') {
        authHttp.get(url, params).then(res => {
          console.log(res)
          resolve(res.data)
        }).catch(res => {
          // typeof fail_cb == 'function' && fail_cb(res) // 没有统一的错误处理时再调用业务的错误处理
          res = errorResFunction(res)
          reject(res)
        })
      } else {
        authHttp.post(url, params).then(res => {
          resolve(res.data)
        }).catch(res => {
          // typeof fail_cb == 'function' && fail_cb(res) // 没有统一的错误处理时再调用业务的错误处理
          res = errorResFunction(res)
          reject(res)
        })
      }
    })
  },
  errorResFunction(res) {
    if (res.errMsg && res.errMsg.indexOf('request:fail') >= 0) {
      if(res.data) res.data.msg = '请求超时'
      return res
    } else {
      let status = res.statusCode
      if (status === 200 && res.data && res.data.succeeded === false && res.data.code > 0 && fail_cb && typeof fail_cb == 'function') {
        if (res.data.code === 523 || res.data.code === 520) {
          res.data.msg = '今日勾搭已达上限，明日再来吧！'
        }
        if (res.data.code === 461 || res.data.code === 462 || res.data.code === 463) {
          res.data.msg = '该巡演已下线！'
        }
        return res
      }
      switch (status) {
        // case 462:
        // case 463:
        // case 464:
        // case 465: // 短信验证码
        //   break
        // case 522: // 微信用户尚未注册
        //   break
        // case 526: // 微信用户登录POMS失败
        //   break
        case 460: // 入参校验失败
          // 微信手机注册时的错误460不需要提示
          let data_message = res.data
          if(res.data && res.data instanceof Array) {
            data_message = res.data.join(',')
          }
          uni.showToast({
            title: data_message,
            icon: 'none',
            duration: 3000
          })
          break
        case 401:
          // 重新获取token
          break
        default:
          // 先统一话消息提示
          if (res && res.data) {
            if (Array.isArray(res.data)) {
              if (res.data.length > 0) {
                let message = ''
                res.data.forEach(item => {
                  if (item) {
                    if (message) {
                      message += '\n' + item
                    } else {
                      message = item
                    }
                  }
                })
                res.message = message
              }
            } else if (typeof (res.data) === 'string') {
              res.message = res.data
            }
            if (res.data.msg) {
              res.message = res.data.msg
            }
            if (res.data.msgs) {
              res.message = res.data.msgs[0]
            }
          } else {
            res = {}
          }
          // 如果业务已经定义了错误提示，则使用业务的处理
          return res
      }
    }
    return res
  },
  // 获取数据
  postData (url, params, method, cb, fail_cb, transHeader) {
    let that = this
    if (typeof method === 'undefined') {
      method = 'POST'
    }
    if (method === 'GET') {
      authHttp.get(url, params, transHeader).then(res => {
        // 所有请求根据状态码来判断,只有200才成功返回数据
        if (typeof cb == 'function' && res.data.code === 200) {
          cb(res)
        } else {
      errorFunction(that, res, fail_cb)
          // fail_cb(res)
        }
      }).catch(res => {
        // typeof fail_cb == 'function' && fail_cb(res) // 没有统一的错误处理时再调用业务的错误处理
        // fail_cb(res)
      errorFunction(that, res, fail_cb)
      })
    } else {
      authHttp.post(url, params, transHeader).then(res => {
      // 所有请求根据状态码来判断,只有200才成功返回数据
      if (typeof cb == 'function' && res.data.code === 200) {
            cb(res)
      } else {
      errorFunction(that, res, fail_cb)
            // fail_cb(res)
      }
      }).catch(res => {
        // typeof fail_cb == 'function' && fail_cb(res) // 没有统一的错误处理时再调用业务的错误处理
        errorFunction(that, res, fail_cb)
      // fail_cb(res)
      })
    }
  },
  // 请求错误处理
  errorFunction (that, res, fail_cb) {
    if (res.errMsg && res.errMsg.indexOf('abort') >= 0) {
      return
    }
    if (res.errMsg && res.errMsg.indexOf('request:fail') >= 0) {
      uni.showToast({
        title: '请求超时',
        icon: 'none',
        image: config.defaultImg.iconCry,
        duration: 1500
      })
      that.netTimeOut = true
      if (fail_cb && typeof fail_cb == 'function') {
        if(res.data){
          res.data.msg = '请求超时'
        } else{
          res.data = {
            message: '请求超时'
          }
        }
        fail_cb(res)
        return
      }
    } else {
      let status = res.data.code
      switch (status) {
      // 没有token
      case 208:
        if (!config.isBuildInH5) {
          setTimeout(function () {
            clearAuth()
          }, 2000)				
        }
        break
      case 209:
        if (!config.isBuildInH5) {
          setTimeout(function () {
            clearAuth()
          }, 2000)				
        }
        break
      // 网络异常
      case 999:
        uni.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
          break
      // 其他错误
      case 201:
        fail_cb(res)
        break
      case 460: // 入参校验失败
        // 微信手机注册时的错误460不需要提示
        let data_message = res.data
        if(res.data && res.data instanceof Array) {
          data_message = res.data.join(',')
        }
        uni.showToast({
          title: data_message,
          icon: 'none',
          duration: 3000
        })
        break
      default:
        // 如果业务已经定义了错误提示，则使用业务的处理
        if (fail_cb && typeof fail_cb == 'function') {
          fail_cb(res)
          return
        }        
        uni.showToast({
          title: res.message,
          icon: 'none',
          duration: 3000
        })
      }
    }
  },
  //检测并更新版本
  detectionUpdata () {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          updateManager.applyUpdate()
          wx.showLoading({
            title: '版本更新中...',
          })
        })
        updateManager.onUpdateFailed(function () {
          // 新的版本下载失败
          wx.showModal({
            title: '新版本已经上线',
            content: '请您删除当前小程序，重新搜索打开',
            showCancel: false,
            confirmText: '知道了'
          })
        })

      }
    })
  },
  // 获取数据列表
  postDataList(url, params, method, cb, fail_cb) {
    var that = this
    postData.call(that, url, params, method,
      function (res) { // 成功
        that.setData({
          dataList: that.data.dataList.concat(res.data.DataRows),
          pageIndex: res.data.CurrentPageIndex
        })
        // 当前页码等于总页码则没有更多了
        if (res.data.PageCount === res.data.CurrentPageIndex) {
          that.setData({
            hasMore: false,
          })
        } else {
          that.setData({
            hasMore: true,
          })
        }
        typeof cb == 'function' && cb(res)
      },
      function (res) { // 失败
        typeof fail_cb == 'function' && fail_cb(res)
      },
    )
  },
  // 上传图片
  uploadImg(url, params, cb, fail_cb) {
    var that = this;
    // console.log(params)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        // var header = {
        //   'content-type': 'multipart/form-data'
        // }
        var access_token = wx.getStorageSync('access_token')
        var header = {
          "Authorization": access_token.startsWith('Bearer ') ? access_token : 'Bearer ' + access_token
        }
        wx.uploadFile({
          url: url,
          filePath: tempFilePaths[0],
          name: 'IsThumbnail',
          header: header,
          formData: params,
          success: function (res) {
            // console.log(res)
            typeof cb == 'function' && cb(res)
          }
        })
      }
    })
  },
  // 页面跳转操作 e:点击dom属性,t:跳转类型 default:navigate 后续再加   
  // <text catchtap="doViewTap" data-url="/pages/login/login?title=navigate">跳转</text>
  // var data = e.currentTarget.dataset;
  // var url = data.url
  // app.util.commonViewTap(url)
  // success fail complete
  commonViewTap(url, t) {
    switch (t) {
      case 1: // 关闭当前页面，跳转到应用内的某个页面。
        wx.redirectTo({
          url: url
        })
        break
      case 2: // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 需在 app.json 的 tabBar 字段定义的页面  路径后不能带参数
        wx.switchTab({
          url: url
        })
        break
      case 3: // 关闭所有页面，打开到应用内的某个页面。
        wx.reLaunch({
          url: url
        })
        break
      case 99: // 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages()) 获取当前的页面栈，决定需要返回几层。
        wx.navigateBack({
          delta: 1
        })
        break
      default: //保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面
        wx.navigateTo({
          url: url
        })
    }
  },
  getPrePage() {
    let pages = getCurrentPages()
    if (pages.length < 2) throw new Error("不存在前一页的Page")
    return pages[pages.length - 2]
  },
  setPrePageData(data) {
    let pages = getCurrentPages()
    pages[pages.length - 2].setData(data)
  },
  // 获取当前页url
  getCurrentPageUrl(){
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length-1] //获取当前页面的对象
    var url = currentPage.route //当前页面url
    return url
  },
  // 获取当前页和参数
  getCurrentPageUrlWithArgs(){
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length-1] //获取当前页面的对象
    var url = currentPage.route //当前页面url
    var options = currentPage.options //如果要获取url中所带的参数可以查看options
    //拼接url的参数
    var urlWithArgs = url + '?'
    for(var key in options){
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length-1)
    return '/' + urlWithArgs
  },
  // 获取分享当前页的包裹对象
  getShareObj (that) {
    let shareMessage = {
      title: that.data.title, // 当前小程序名称
      desc: that.data.title, // 描述
      imageUrl: that.data.defaultImg.shareDetailBk, // 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      path: that.data.pageLink // 当前页面 path ，必须是以 / 开头的完整路径
    }
    return shareMessage
  },
  // 获取定位授权方法
  wxGetLocation (cb, failCb) {
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        let pos = {latitude: res.latitude, longitude: res.longitude, speed: res.speed, accuracy: res.accuracy}
        let posStr = JSON.stringify(pos)
        wx.setStorage({
          key:'currentPosition',
          data: posStr
        })
        cb && cb(pos)
      },
      fail (err) {
        wx.setStorage({
          key:'locationDeny',
          data: err.errMsg
        })
        failCb && failCb(err)
      }
    })
  },
  // 打开微信设置
  wxOpenSetting () {
    wx.openSetting({
      success (res) {
        if (res.authSetting && res.authSetting['scope.userLocation']) {
          wx.removeStorage({
            key: 'locationDeny',
            success (res) {
              console.log(res)
            }
          })
        }
      },
      fail (err) {
        console.log(err)
      }
    })
  },
  // 遍历scene参数,从中拼接url和键值对
  dealScene (scendObj) {
    let url = scendObj.page
    let obj = scendObj.params
    let str = ''
    let attr = []
    for (var i in obj) {
      let key = i
      let value = obj[i]
      attr.push([key, value])
    }
    if (attr.length > 0) {
      for (let m = 0; m < attr.length; m++) {
        if (m == 0) {
          str += '?' + attr[m][0] + '=' + attr[m][1]
        } else {
          str += '&' + attr[m][0] + '=' + attr[m][1]
        }
      }
    }
    return '/' + url + str
  },
  //通过id获取元素的布局位置和滚动位置
  getboundingClientRect(that,id){
    return new Promise((resolve)=>{
        that.$nextTick(()=>{
            uni.createSelectorQuery().select(id).boundingClientRect().selectViewport().scrollOffset().exec((rect) => {
                resolve(rect)
            })
        })
        
    })
  },
  // 设置title
  setTitle (title) {
    uni.setNavigationBarTitle({
    　　title: title
    })
  },
  // 页面滚动到固定高度
  pageScrollTo (height) {
    let ht = height ? height : 0
    uni.pageScrollTo({
      scrollTop: ht,
      duration: 300
    })
  },
  clearAuth () {
    xtyStorage.clear()
    // 存储当前页面路径,授权后跳回来
    recordLastViewPage()
    let url = '/pages/authUser/index'
    commonViewTap(url, 3)
  },
  // 记录授权前浏览的页面
  recordLastViewPage () {
    let pageWithArgs = getCurrentPageUrlWithArgs()
    let lastPageUrl = xtyStorage.lastPageUrl
    xtyStorage.set(lastPageUrl, pageWithArgs)
  },
  // 返回授权前的页面
  umpPageAfterAuth () {
    let lastPageUrl = xtyStorage.get(xtyStorage.lastPageUrl)
    console.log(lastPageUrl)
    let url = lastPageUrl ? lastPageUrl : '/pages/index/index'
    commonViewTap(url, 3)
  },
  // 全局自定义返回上一页
  returnPrevPage () {
    let url = location.pathname
    // 支付页面拦截,弹出dialog
    let tips = 'arrowAcvitityListBack'
    // let testUrl = '/pages/singleActivity/payOrder'
    let testUrl = '/pages/bbb/dd'
    // 订单页面特殊处理
    if (url == testUrl) {
      Bus.$emit('payOrderShowLeaveDialog', null)
    } else {
      // 判断页面栈,大于1返回上一页，等于1直接销毁
      let pages = getCurrentPages()
      if (pages.length > 1) {
        commonViewTap('', 99)
      } else {
        sendApp.leftArrowModifyClick(tips)
      }
    }
  },
  // 检查小程序是否登录
  checkMiniIsLogin () {
    let loginTokenInfo = xtyStorage.get(xtyStorage.loginTokenInfo)
    let idNumber = loginTokenInfo ? (JSON.parse(loginTokenInfo)).idNumber : ''
    return idNumber
  },
  // 获取登录的用户信息
  getLoginUserInfo () {
    let loginTokenInfo = xtyStorage.get(xtyStorage.loginTokenInfo)
    return loginTokenInfo ? JSON.parse(loginTokenInfo) : ''
  },
  // 页面分享操作 app.util.commonShareAppMessage()
  commonShareAppMessage(params) {
    if (typeof params === 'undefined') {
      params = config.ShareMessage
    }
    return params
  },
  abortAllRequest,
  isAllRequestOver,
}

export {uniUtil}