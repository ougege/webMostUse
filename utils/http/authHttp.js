// 授权HTTP请求工具

import * as basicHttp from './basicHttp.js'
const base64 = require('../alioss/Base64.js')
// import config from '../config'
import {xtyStorage} from '../common/xtyStorage.js'

function getAccessToken() {
  // 获取token
  let loginTokenInfo = xtyStorage.get(xtyStorage.loginTokenInfo)
  // var access_token = uni.getStorageSync('access_token')
  var access_token = loginTokenInfo ? (JSON.parse(loginTokenInfo)).token : ''
  // 捞用的token
  // access_token = '4f70b0741f227b6460108129bbeeff83'
  if (!access_token) {
    return ''
  }
  else {
    return access_token
  }
}

function getRefreshToken(){
  var refresh_token = uni.getStorageSync('refresh_token')
  if (!refresh_token) {
    return ''
  }
  else {
    return refresh_token
  }
}
function getTempToken() {
  var tempToken = uni.getStorageSync('temp_token')
  if (!tempToken) {
    return ''
  }
  else {
    return tempToken
  }
}

function authorization(t) {
  return t.startsWith('Bearer ') ? t : 'Bearer ' + t
}
export const getToken = function () {
  var tempToken = uni.getStorageSync('temp_token')
  if (!tempToken) {
    return ''
  } else {
    return tempToken
  }
}

export const get = function (url, data, transHeader) {
  // 先注释:单身旅游，缘分球需要token
  let header = {}
  var access_token = getAccessToken()
  if (access_token) {
    header = Object.assign(header, { "token": access_token})
  }
  if (transHeader) {
    header = Object.assign(header, transHeader)
  }
  // let clientId = uni.getStorageSync('clientId')
  // header =Object.assign(header, { "tenantId": clientId})
  if(url && (url.indexOf('user/login') >= 0 || url.indexOf('oauth/token') >= 0)){
    // client:secret
    // let clientSecretStr = clientId + ':' + config.clientSecret
    // let clientSecretCode = base64.encode(clientSecretStr)
    // header = Object.assign(header, { "Authorization": clientSecretCode})
  }
  return basicHttp.get(url, data, header)
}

export const post = function (url, data, transHeader) {
  // 先注释:单身旅游，缘分球需要token
  let header = {}
  var access_token = getAccessToken()
  if (access_token) {
  	header = Object.assign(header, { "token": access_token})
  }
  if (transHeader) {
  	header = Object.assign(header, transHeader)
  }
  // let clientId = uni.getStorageSync('clientId')
  // header =Object.assign(header, { "tenantId": clientId})
  if(url && (url.indexOf('user/login') >= 0 || url.indexOf('oauth/token') >= 0)){
    // client:secret
    // let clientSecretStr = clientId + ':' + config.clientSecret
    // let clientSecretCode = base64.encode(clientSecretStr)
    // header = Object.assign(header, { "Authorization": 'Basic ' + clientSecretCode})
  }
  return basicHttp.post(url, data, header)
}

export default {
  getRefreshToken,
  getToken,
  get,
  post
}
