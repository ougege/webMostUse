import {areaInfoUtil} from './areaInfo/AreaInfoUtil'
import {type} from './type'
const validateRules = require('./validateRules')
// const authHttp = require('./http/authHttp')
const config = require('../common/appConfig')
// import {setStorage, getStorage, removeStorage, clearStorage} from './storage'
var base64encodechars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
var base64decodechars = [
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
  -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1]

const util = {
  base64encode: function (str) {
    var out
    var i
    var len
    var c1
    var c2
    var c3
    len = str.length
    i = 0
    out = ''
    while (i < len) {
      c1 = str.charCodeAt(i++) & 0xff
      if (i === len) {
        out += base64encodechars.charAt(c1 >> 2)
        out += base64encodechars.charAt((c1 & 0x3) << 4)
        out += '=='
        break
      }
      c2 = str.charCodeAt(i++)
      if (i === len) {
        out += base64encodechars.charAt(c1 >> 2)
        out += base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4))
        out += base64encodechars.charAt((c2 & 0xf) << 2)
        out += '='
        break
      }
      c3 = str.charCodeAt(i++)
      out += base64encodechars.charAt(c1 >> 2)
      out += base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4))
      out += base64encodechars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6))
      out += base64encodechars.charAt(c3 & 0x3f)
    }
    return out
  },
  base64decode: function (str) {
    var c1
    var c2
    var c3
    var c4
    var i
    var len
    var out
    len = str.length
    i = 0
    out = ''
    while (i < len) {
      do {
        c1 = base64decodechars[str.charCodeAt(i++) & 0xff]
      } while (i < len && c1 === -1)
      if (c1 === -1) {
        break
      }
      do {
        c2 = base64decodechars[str.charCodeAt(i++) & 0xff]
      } while (i < len && c2 === -1)
      if (c2 === -1) {
        break
      }
      out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4))
      do {
        c3 = str.charCodeAt(i++) & 0xff
        if (c3 === 61) {
          return out
        }
        c3 = base64decodechars[c3]
      } while (i < len && c3 === -1)
      if (c3 === -1) {
        break
      }
      out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2))
      do {
        c4 = str.charCodeAt(i++) & 0xff
        if (c4 === 61) {
          return out
        }
        c4 = base64decodechars[c4]
      } while (i < len && c4 === -1)
      if (c4 === -1) {
        break
      }
      out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
    }
    return out
  },
  // 获取数据
  // getData (url, params, method, cb, failCb) {
  //   let that = this
  //   if (type['isUndefined'](method)) {
  //     method = 'POST'
  //   }
  //   if (method.toUpperCase() === 'GET') {
  //     authHttp.get(url, params).then(res => {
  //       if (that.setData) {
  //         that.setData({
  //           netTimeOut: false // 不超时
  //         })
  //       } else {
  //         that.netTimeOut = false
  //       }
  //       type['isFunction'](cb) && cb(res)
  //     }).catch(res => {
  //       errorFunction(that, res, failCb)
  //     })
  //   } else {
  //     authHttp.post(url, params).then(res => {
  //       if (that.setData) {
  //         that.setData({
  //           netTimeOut: false
  //         })
  //       } else {
  //         that.netTimeOut = false
  //       }
  //       type['isFunction'](cb) && cb(res)
  //     }).catch(res => {
  //       errorFunction(that, res, failCb)
  //     })
  //   }
  // },
  // 获取下一页数据
  // etNextPageData (url, params, method, cb, failCb) {
  //   let that = this
  //   this.getData.call(that, url, params, method,
  //     (res) => {
  //       // 当前页码等于总页码则没有更多
  //       let hasMore = res.data.PageCount === res.data.CurrentPageIndex ? false : true
  //       if (that.setData) {
  //         that.setData({
  //           dataList: [...that.data.dataList, ...res.data.DataRows],
  //           pageIndex: res.data.CurrentPageIndex,
  //           hasMore: hasMore
  //         })
  //       } else {
  //         that.dataList = [...that.data.dataList, ...res.data.DataRows]
  //         that.pageIndex = res.data.CurrentPageIndex
  //         that.hasMore = hasMore
  //       }
  //       type['isFunction'](cb) && cb(res)
  //     },
  //     (err) => {
  //       type['isFunction'](failCb) && failCb(err)
  //     }
  //   )
  // },
  // 错误处理
  errorFunction (that, res, failCb) {
    // 无错误状态
    if (res.errMsg && res.errMsg.includes('request:fail')) {
      if (that.setData) {
        that.setData({
          netTimeOut: true
        })
      } else {
        that.netTimeOut = true
      }
      if (failCb && type['isFunction'](failCb)) {
        if (res.data) {
          res.data.message = '请求超时'
        } else {
          res.data = {message: '请求超时'}
        }
        failCb(res)
        return false
      }
    } else {
      let status = res.statusCode
      switch (status) {
        // case 460 短信
        case 401:
          // 重新获取token 等方法
          break
        default:
          // 如果业务已经定义了错误提示，则使用业务的处理
          if (failCb && type['isFunction'](failCb)) {
            failCb(res)
            return false
          }
      }
    }
  },
  // 浅拷贝
  shallowCopy (obj) {
    if (type['isNull'](obj)) {
      return null
    } else {
      return Object.create(
        Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
      )
    }
  },
  // 深拷贝
  deepCopy (obj) {
    let target = {}
    if (type['isNull'](obj) || typeof obj !== 'object') {
      return obj
    }
    // 不要使用Object.keys遍历:不遍历可枚举的原型链属性
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'object') {
          target[key] = this.deepCopy(obj[key])
        } else {
          target[key] = obj[key]
        }
      }
    }
    return target
  },
  // 分享页面操作
  commonShareAppMessage (params) {
    if (type['isUndefined'](params)) {
      params = config.shareMessage
    }
    return params
  },
  // 统一跳转方法:t跳转类型
  // <text catchtap='doViewTap' data-url='/pages/login/login?title=navigate'>跳转</text>
  // let data = e.currentTarget.dataset
  // let url = data.url
  // app.util.commonViewTap(url)
  // commonViewTap (url, t) {
  //   switch (t) {
  //     case 1: // 关闭当前页面,跳转到应用内的某个页面.但是不允许跳转到tabbar
  //       wx.redirectTo({
  //         url: url
  //       })
  //       break
  //     case 2: // 跳转到tabbar页面,并关闭其他所有非tabBar页面
  //       wx.switchTab({
  //         url: url
  //       })
  //       break
  //     case 3: // 关闭所有页面，打开到应用内的某个页面
  //       wx.reLaunch({
  //         url: url
  //       })
  //       break
  //     case 99: // 关闭当前页面,跳转到应用内的某个页面。但是不能跳到tabbar页面.getCurrentPages()获取页面栈
  //       wx.navigateBack({
  //         delta: 1
  //       })
  //     default: // 保留当前页面，跳转到应用内的某个页面使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层
  //       // 新增events方法，页面通信 https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html
  //       wx.navigateTo({
  //         url: url
  //       })
  //   }
  // },
  // 微信内置地图位置
  // viewWxAddress (args) {
  //   if (!args || type['isUndefined'](args.latitude) || type['isUndefined'](args.longitude)) {
  //     // 错误坐标会定位到北京
  //     return
  //   }
  //   wx.openLocation({
  //     latitude: args.latitude, // 经度
  //     longitude: args.longitude, // 纬度
  //     name: args.name, // 位置名
  //     address: args.address, // 地址详细说明
  //     scale: args.scale || 18 // 5-18,默认18
  //   })
  // },
  // 数组去重:不带id普通数组去重;带id，数组对象去重
  arrDuplicateRemove (arr, id) {
    let temp = []
    let idArr = []
    if (!id) {
      arr.forEach(item => {
        if (!temp.includes(item)) {
          temp.push(item)
        }
      })
    } else {
      arr.forEach(item => {
        if (!idArr.includes(item[id])) {
          idArr.push(item[id])
          temp.push(item)
        }
      })
    }
    return temp
  },
  // 数组删除某项值
  arrRemoveByValue (arr, value, attr) {
    if (!type['isArray'](arr)) {
      throw new Error('必须是数组')
    } else {
      // 不带attr，删除值;
      if (!attr) {
        arr.includes(value) && arr.splice(arr.indexOf(value), 1)
      } else { // 带attr，删除属性
        arr.filter(item => {
          if (item[attr] === value) return item
        })
      }
    }
    return arr
  },
  // 美式价格，隔三加逗号
  numToThousands (num) {
    num = (num || 0).toString()
    let decimal = '00'
    let result = ''
    if (num.includes('.')) {
      decimal = num.split('.')[1]
      num = num.split('.')[0]
    }
    if (num.length > 3) {
      let k = 0
      for (let i = num.length; i > 0; i--) {
        result += num.charAt(i - 1)
        k += 1
        if (k === 3 && i !== 1) {
          result += ','
          k = 0
        }
      }
      result = result.split('').reverse().join('')
    } else {
      result = num
    }
    return `${result}.${decimal}`
  },
  // 获取客户端系统信息
  // https://developers.weixin.qq.com/miniprogram/dev/api/base/system/system-info/wx.getSystemInfoSync.html
  // getSystemInfoSync () {
  //   // let res = wx.getSystemInfo()
  //   let systemInfo = {}
  //   try {
  //     let res = wx.getSystemInfoSync() // 同步版本
  //     systemInfo = {
  //       brand: res.brand, // 设备品牌
  //       model: res.model, // 设备型号
  //       pixelRatio: res.pixelRatio, // 设备像素比
  //       screenWidth: res.screenWidth, // 屏幕宽度
  //       screenHeight: res.screenHeight, // 屏幕高度
  //       windowWidth: res.windowWidth, // 可使用窗口宽度
  //       windowHeight: res.windowHeight, // 可使用窗口高度
  //       statusBarHeight: res.statusBarHeight, // 状态栏的高度
  //       language: res.language, // 微信设置的语言
  //       version: res.version, // 微信版本号
  //       system: res.system, // 操作系统和版本
  //       platform: res.platform // 客户端平台
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  //   let loginLog = {
  //     City: null, // 登录所在城市（需要请求用户授权获取手机定位）
  //     Province: null, // 登录所在省份（需要请求用户授权获取手机定位）
  //     Country: null, // 登录所在国家（需要请求用户授权获取手机定位）
  //     Language: systemInfo.language || 'zh_CN', // 浏览的语言风格
  //     ThirdAppType: 1, // 第三方登录凭证类型 = ['微信小程序' = 1, '其他' = 999], 使用数值，避免变更名称后出错
  //     SourceType: '小程序', // 登陆渠道 = ['Web', '小程序', 'App', '微信公众号', '其它']
  //     DeviceType: 'CellPhone', // 登录设备类型 = ['PC', 'Pad', 'CellPhone']
  //     Sysetm: systemInfo.system || null, // 客户机系统类型
  //     Platform: 'WeChat', // 产品寄宿的平台
  //     PFMVersion: null, // 产品寄宿的平台的版本
  //     ProductVersion: config.productVersion
  //   }
  //   return {systemInfo: systemInfo, loginLog: loginLog}
  // },
  // 上传图片
  // https://developers.weixin.qq.com/miniprogram/dev/api/network/upload/wx.uploadFile.html
  // uploadImg (url, params, cb, failCb) {
  //   let that = this
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['original', 'compressed'], // 指定原图，默认图
  //     sourceType: ['album', 'camera'], // 指定来源相册或相机
  //     success (res) {
  //       // tempFilePath可以作为img标签的src属性显示图片
  //       let tempFilePaths = res.tempFilePaths
  //       let accessToken = wx.getStorageSync('access_token')
  //       let header = Object.assign({}, {'Authorization': authHttp.authorization(accessToken)})
  //       wx.uploadFile({
  //         url: url,
  //         filePath: tempFilePaths[0],
  //         name: 'pic',
  //         formData: params,
  //         success (res){
  //           type['isFunction'](cb) && cb(res)
  //         },
  //         fail (res) {
  //           type['isFunction'](failCb) && failCb(res)
  //         }
  //       })
  //     }
  //   })
  // },
  // 拿到上一页对象
  // getPrePage () {
  //   let pages = getCurrentPages()
  //   let length = pages.length
  //   if (length < 2) {
  //     throw new Error('不存在前一页Page')
  //   }
  //   return pages[length - 2]
  // },
  // 根据传入的坐标判断左滑右滑
  // touchDirection (endX, endY, startX, startY) {
  //   if (endX - startX > 50 && Math.abs(endY - startY) < 50) {
  //     return 'right'
  //   }
  //   if (endX - startX < -50 && Math.abs(endY - startY) < 50) {
  //     return 'left'
  //   }
  // },
  // 小于10加0处理
  addZero (e) {
    return Number(e) < 10 ? `0${e}` : e
  },
  // 时间格式化:同时将时间统一处理成斜杠
  // yyyy/MM/dd hh:mm:ss
  dateFormat (dateIn, fmt) {
    if (!fmt) return false
    let newDate = type['isDate'](dateIn) ? dateIn : new Date(dateIn)
    let o = {
      'y+': newDate.getFullYear(), // 年份
      'M+': this.addZero(newDate.getMonth() + 1), // 月份
      'd+': this.addZero(newDate.getDate()), // 某一天
      'h+': this.addZero(newDate.getHours()), // 小时
      'm+': this.addZero(newDate.getMinutes()), // 分钟
      's+': this.addZero(newDate.getSeconds()) // 秒
    }
    for (let i in o) {
      if (new RegExp('(' + i + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, o[i])
      }
    }
    return fmt
  },
  // new 一个时间戳:无参返回当前时间戳,有参返回传入时间的时间戳
  newTimeStamp (dateIn) {
    if (!dateIn) {
      return new Date().getTime()
    } else {
      let newDate = type['isDate'](dateIn) ? dateIn : new Date(dateIn)
      return newDate.getTime()
    }
  },
  // 生成独一无二的字符串:字符串转32进制
  createUniqueString () {
    let timestamp = this.newTimeStamp()
    let randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(timestamp + randomNum)).toString(32)
  },
  // 生成UUID
  generateUUID () {
    let d = this.newTimeStamp()
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uuid
  },
  // debounce:去抖就是连续多次delay内操作取最后一次操作真正执行
  // https://segmentfault.com/a/1190000014292298
  debounce (cb, delay, that) {
    if (!that.timeId) {
      that.timeId = setTimeout(() => {
        cb()
        that.timeId = null
      }, delay)
    }
  },
  // 匹配url的某个query值:无window对象则不可用
  getQueryStringByName (name) {
    let reg = new RegExp('(^|&)' + name + '=(\\w+|$)', 'i')
    let r = window.location.search.substr(1).match(reg)
    let context = ''
    if (r !== null) {
      context = r[2]
    }
    return context
  },
  // 参数去空
  paramsRemoveNull (obj) {
    if (type['isObject'](obj)) {
      for (let item in obj) {
        if (type['isUndefined'](obj[item]) || type['isNull'](obj[item])) {
          delete obj[item]
        }
      }
    } else {
      throw new Error('args should be a object')
    }
    return obj
  },
  // api请求时，给params动态赋值
  objectAddAttr (obj, value, attr) {
    if (type['isObject'](obj) && type['isString'](attr) && value !== null) {
      let test = {}
      test[attr] = value
      Object.assign(obj, test)
    } else {
      throw new Error('参数有误')
    }
  },
  areaInfoUtil: areaInfoUtil,
  validateRules: validateRules
}

export {util}
