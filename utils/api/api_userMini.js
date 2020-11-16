var config = require('../config.js')
module.exports = {
  getOpenId: config.host + 'api/wechat/get/openId', // 用户-获取openid
  loginOrCreate: config.host + 'api/wechat/getToken', // 用户-登录或创建新用户
  wechatDecryptData: config.host + 'api/wechat/decryptData', // 微信小程序 解密数据
  getAppletVersionInfo: config.host + 'api/version/getAppletInfo', // 小程序-获取审核版本信息
}