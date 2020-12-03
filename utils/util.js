import {areaInfoUtil} from './areaInfo/AreaInfoUtil'
import {type} from './common/type'
import {amap} from './AMap/amap'
import {uniUtil} from './uniUtil'
import config from '../utils/config'
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

// 观察对象方法
const domWatch = function(domObj, callback){
  return new domWatchClass(domObj, callback)
}
const domWatchClass = function(domObj, callback){
  let domObserver = new MutationObserver(callback)
  let option = {
    'childList': true, // 子节点的变动
    'attributes': true, // 属性的变动
    'characterData': true // 节点内容或节点文本的变动
  }
  domObserver.observe(domObj, option)
  this.tempObj = domObserver
  this.stopWatch = function () {
    this.tempObj.disconnect()
  }
}

// rgb转16进制
function insertZero(R,G,B){
  R = R.toString(16).length>=2?R.toString(16):"0"+R.toString(16)
  G = G.toString(16).length>=2?G.toString(16):"0"+G.toString(16)
  B = B.toString(16).length>=2?B.toString(16):"0"+B.toString(16)
  
  return R+G+B
}

const util = {
  base64encode (str) {
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
  base64decode (str) {
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
  // 常用拷贝
  cloneObj (obj) {
    let str
    if (!obj) {
      return obj
    }
    let newobj = obj.constructor === Array ? [] : {}
    if (typeof obj !== 'object') {
      return
    } else if (window.JSON) {
      str = JSON.stringify(obj) // 序列化对象
      newobj = JSON.parse(str) // 还原
    } else {
      for (var i in obj) {
        newobj[i] = typeof obj[i] === 'object' ? this.cloneObj(obj[i]) : obj[i]
      }
    }
    return newobj
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
  // 深拷贝:大对象会堆栈溢出
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
  // 深拷贝：终极
  objectDeepClone (obj,isForce) {
    if(!obj || Object.prototype.toString.call(obj) !== '[object Object]'){
      return obj
    }
    var uniqueList = []
    var isForce = !!isForce
    var result = {}
    var loopList = [
      {
        parent: result,
        key: undefined,
        data: obj
      }
    ]
    while(loopList.length){
      var node = loopList.pop()
      var parent = node.parent
      var key = node.key
      var data = node.data
      var tempRes = parent
      if(key !== undefined){
        tempRes = parent[key] = {}
      }
      if(!isForce){
        var uniqueData = this.uniqueFind(uniqueList,data)
        if(uniqueData){
          parent[key] = uniqueData.target
          continue
        }
      }
      uniqueList.push({
        source: data,
        target: tempRes
      })
      for(var k in data){
        if(data.hasOwnProperty(k)){
          var val = data[k]
          if(Object.prototype.toString.call(val) === '[object Object]'){
            loopList.push({
              parent: tempRes,
              key: k,
              data: val
            })
          }else{
            // 增加逻辑，将function转成string
            tempRes[k] = type['isFunction'](val) ? val.toString() : val
          }
        }
      }
  
    }
    uniqueList = null
    return result
  },
  // 深拷贝：extra 数组中循环查找存在对象
  uniqueFind (arr, item) {
    var len = arr.length
    while (len--){
      if (arr[len].source === item) {
        return arr[len]
      }
    }
    return null
  },
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
  // 根据传入的坐标判断左滑右滑
  touchDirection (endX, endY, startX, startY) {
    if (endX - startX > 50 && Math.abs(endY - startY) < 50) {
      return 'right'
    }
    if (endX - startX < -50 && Math.abs(endY - startY) < 50) {
      return 'left'
    }
  },
  // 小于10加0处理
  addZero (e) {
    return Number(e) < 10 ? `0${e}` : e
  },
  // 利用正则匹配将任意时间格式化
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
  // 时间格式化
  formatDateTime (dateTime, type) {
    let newDateStr = dateTime.replace(/-/g, '/')
    let newDate = new Date(newDateStr)
    let year = newDate.getFullYear()
    let month = addZero(newDate.getMonth() + 1)
    let day = addZero(newDate.getDate())
    let weekDay = transWeekDay(newDate.getDay())
    let hour = addZero(newDate.getHours())
    let minute = addZero(newDate.getMinutes())
    let second = addZero(newDate.getSeconds())
    if (type === 1) {
      // 2019/08/30 15:20:39
      return ` ${year}/${month}/${day} ${hour}:${minute}:${second} `
    }
    if (type === 2) {
      // 2019/08/30
      return ` ${year}/${month}/${day} `
    }
    if (type === 3) {
      // 2019/08/30 周六 15:20:39
      return `${year}/${month}/${day} ${weekDay} ${hour}:${minute}`
    }
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
  // 时间:秒转换
  transSecond (second, type) {
    // 转换成时分
    let minute = this.addZero(Math.floor(second / 60))
    let hour = this.addZero(Math.floor(minute / 60))
    if (type == 1) {
      return `${hour}:${minute}`
    }
  },
  sectionToChinese (section) {
    section = parseInt(section)
    var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    var chnUnitSection = ['', '万', '亿', '万亿', '亿亿']
    var chnUnitChar = ['', '十', '百', '千']
    var strIns = '', chnStr = ''
    var unitPos = 0
    var zero = true
    while (section > 0) {
      var v = section % 10
      if (v === 0) {
        if (!zero) {
          zero = true
          chnStr = chnNumChar[v] + chnStr
        }
      } else {
        zero = false
        strIns = chnNumChar[v]
        strIns += chnUnitChar[unitPos]
        chnStr = strIns + chnStr
      }
      unitPos++
      section = Math.floor(section / 10)
    }
    return chnStr
  },
  getPhoneNumberCodeString(phone) {
    let PhoneNumberString = phone ? phone.substring(0, 3) + '****' + phone.substring(7, 11) : '无'
    return PhoneNumberString
  },
  // 处理相对路径url问题。为相对路径增加host头，如果是绝对路径则不需要再添加
  dealRelativeUrl(url, hostToAdd) {
    if (!url) {
      return ''
    }
    if (!hostToAdd) {
      return url
    }
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    // 移除最后的/
    hostToAdd = (hostToAdd.substring(hostToAdd.length - 1) === '/') ? hostToAdd.substring(0, hostToAdd.length - 1) : hostToAdd;
    return hostToAdd + '/' + url
  },
  // 压缩图片比例: 1-100
  compressImg (url, type) {
    let val = type ? type : 100
    return `${url}?x-oss-process=image/resize,p_${val}`
  },
  // 长边压缩, val越大,图片越大
  compressImgLongLine (url, val = 200) {
    return `${url}?x-oss-process=image/resize,l_${val}`
  },
  // 生成俩个随机数之间的数字:type控制整数还是浮点数
  randomBetween (arr, type) {
    let a = Number(arr[0])
    let b = Number(arr[1])
    let min = a < b ? a : b
    let max = a < b ? b : a
    if (type === 'float') {
      return min + Math.random() * (max - min)
    } else {
      return Math.floor(min + Math.random() * (max - min + 1))
    }
  },
  // 冒泡排序
  bubble (arr) {
    let temp
    for (var i = 0; i < arr.length - 1; i++) {    
      for(var j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j+1]) {
          temp = arr[j]
          arr[j] = arr[j+1]
          arr[j+1] = temp
        }
      }
    }
    return arr
  },
  // 随机颜色: 0是rgb,1是16进制
  colorRandom (type) {
    if (!type) {
      let r = numRandom(0,255)
      let g = numRandom(0,255)
      let b = numRandom(0,255)
      return `rgb(${r},${g},${b})`
    } else {
      let r = numRandom(0,255)
      let g = numRandom(0,255)
      let b = numRandom(0,255)
      return '#' + insertZero(r,g,b)
    }
  },
  areaInfoUtil: areaInfoUtil,
  type: type,
  amap: amap,
  domWatch: domWatch,
}

Object.assign(util, uniUtil)
export {util}
