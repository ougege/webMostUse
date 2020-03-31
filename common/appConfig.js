// 通用配置
let isDevelopment = !(process.env.NODE_ENV === 'production')
let version = process.env.version || ''
var appConfig = function () {}
appConfig.noOpReloginSecs = 30 * 60 // 指定秒数内不操作则自动退出
appConfig.footerInfo = {
  versionRelease: version,
  version: version.substring(0, version.lastIndexOf('.')),
  webYear: new Date().getFullYear(),
  webHost: 'ougege.cn',
  webCodeF: '浙ICP备XXX号 ', // 浙公网安备
  webCodeS: '', // 增值电信业务经营许可证
  webCodeT: '' // 浙ICP备
}
if (process.env.VUE_ENV === 'client' && !isDevelopment) {
  // 屏蔽console.log()
  console.log = function () { }
  console.warn = function () { }
  console.debug = function () { }
  console.error = function () { }
}

if (process.env.VUE_ENV === 'client') {
  appConfig.systemBackUrl = '/sys/api/v1/' // 系统后台API
  appConfig.testUrl = 'http:localhost:3000/'
} else {
  appConfig.systemBackUrl = 'http://www.ougege.cn:14804/api/v1/' // 系统后台API
  appConfig.testUrl = 'http:localhost:3000/'
}

appConfig.mapKey = 'b859abd2ad15ea3ac6287574c3f345bc' // 高德地图key

if (isDevelopment === false) {
  appConfig.baseCookieDomain = 'www.ougege.cn'
  appConfig.frontHostH5 = 'https://m.ougege.cn/'
} else {
  appConfig.baseCookieDomain = 'localhost'
  appConfig.frontHostH5 = 'http://localhost:8080/'
}
// 从后端获取配置
appConfig.GetFromRemote = function () {
  // to do
}
appConfig.isDevelopment = isDevelopment
export {appConfig}
