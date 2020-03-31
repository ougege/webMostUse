// 通过校验规则
const validateRules = {
  // 手机号
  phone (value) {
    if (value) {
      return /^1(3|4|5|6|7|8|9)\d{9}$/g.test(value)
    } else {
      return false
    }
  },
  // 座机
  telePhone (value) {
    if (value) {
      return /^0\d{2,3}-?\d{7,8}$/g.test(value)
    } else {
      return false
    }
  },
  // 邮箱:允许汉字,字幕，数字,域名只允许英文域名
  mailAddress (value) {
    if (value) {
      return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)+$/g.test(value)
    } else {
      return false
    }
  },
  // 密码包含数字,字母,特殊字符字少俩种组合
  password (value) {
    let sum = 0
    // 匹配数字
    if (/[0-9]/g.test(value)) {
      sum++
    }
    // 匹配字母
    if (/[a-zA-Z]/g.test(value)) {
      sum++
    }
    // 匹配特殊字符
    if ((/(|!|@|#|\$|%|\^|&|\*|\(|\)|_|\+|-|=)/g).test(value)) {
      sum++
    }
    return sum >= 2
  },
  // 判断字符串是否日期格式
  isDateString (value) {
    // 可能是invalid date，所以改用getTime判断
    let timeStamp = new Date(value).getTime()
    let result = isNaN(timeStamp)
    return !result
  }
  // 判断网址
}
export {validateRules}
