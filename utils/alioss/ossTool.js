const ossConfig = require('./config.js')
const http = require('../http/authHttp.js')
const basicHttp = require('../http/basicHttp.js')
const base64 = require('./Base64.js')
const sha1 = require('./sha1.js').SHA1
const hmac = require('./hmac.js').HMAC
const crypto = require('./crypto.js')
const ossEnum = require('./ossEnum.js')
let policy = null, stsToken = null
const app = getApp()

const initPolicy = function () {
  return new Promise((resolve, reject) => {
    if (!policy) {
    // if (true) {
      const data = {
        OperatorId: app.globalData.xtyUser.Id,
        EntityId: 'system',
        FileType: ossEnum.FileType.Picture,
        BusiCode: ossEnum.BusiCodeOfFile.EntityPics
      }
      http.post(ossConfig.aliyunPolicyUrl, data).then(res => {
        policy = res.data
        // 有效期5分钟
        setTimeout(() => {
          policy = null
        }, 5 * 60 * 1000)
        resolve(true)
      }).catch(err => {
        uni.showToast({
          icon: 'none',
          title: '获取上传策略失败',
          duration: 3000
        })
        console.log(err)
        resolve(false)
      })
    } else {
      resolve(true)
    }
  })
}

const getStsToken = function () {
  return new Promise((resolve, reject) => {
    if (!stsToken) {
      // if (true) {
      const data = {
        OperatorId: app.globalData.xtyUser.UserId,
        EntityId: app.globalData.activityHostCurrent.EntityId,
        FileType: ossEnum.FileType.Picture,
        BusiCode: ossEnum.BusiCodeOfFile.EntityPics
      }
      http.post(ossConfig.getStsTokenUrl, data).then(res => {
        stsToken = res.data
        // 有效期5分钟
        setTimeout(() => {
          stsToken = null
        }, 5 * 60 * 1000)
        resolve(true)
      }).catch(err => {
        uni.showToast({
          icon: 'none',
          title: '获取上传临时令牌失败',
          duration: 3000
        })
        console.log(err)
        resolve(false)
      })
    } else {
      resolve(true)
    }
  })
}

// 获取文件后缀名
const get_suffix = function (filename) {
  if (!filename) {
    return ''
  }
  let pos = filename.lastIndexOf('.')
  let suffix = ''
  if (pos != -1) {
    suffix = filename.substring(pos)
  }
  return suffix
}

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
// 生产uuid
function NewGuid() {
  return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}

// 上传文件
/**
 * @param args args.filePath上传文件 args.success成功回调 args.fail失败回调
 */
const uploadFile = function (args) {
  const filePath = args.filePath
  let successCB = args.success ? args.success : args.successCB;
  let errorCB = args.fail ? args.fail : args.errorCB;
  if (!filePath || filePath.length < 9) {
    errorCB({
      message: '选择的文件路径有误'
    })
    return;
  }
  initPolicy().then(res => {
    if (res) {
      const aliyunServerURL = policy.OssUrl
      const aliyunFileKey = `${policy.UploadDir}/${NewGuid()}${get_suffix(filePath)}`
      uni.uploadFile({
        url: aliyunServerURL,
        filePath: filePath,
        name: 'file',
        formData: {
          'key': aliyunFileKey,
          'OSSAccessKeyId': policy.AccessId,
          'policy': policy.Policy,
          'Signature': policy.Signature,
          'success_action_status': '200',
          'x-oss-meta-tag': ''
        },
        success: function (res) {
          if (res.statusCode != 200) {
            errorCB(res)
            return;
          }
          console.log('上传文件成功', res)
          // imageZoom(aliyunServerURL + '/' + aliyunFileKey, '_Zoom', 10,10)
          successCB({ url: aliyunServerURL + '/' + aliyunFileKey }); // 成功时返回上传文件的全路径
        },
        fail: function (err) {
          err.wxaddinfo = aliyunServerURL;
          errorCB(err)
        }
      })
    }
  })
}
/**
 * @param oldImgUrl 原来的资源
 * @param newName 在原来的资源路径后追加
 * @param width 宽度
 * @param height 高度
 */
const imageZoom = function (oldImgUrl, newName,width, height) {
  return new Promise((resolve, reject) => {
    getStsToken().then(res => {
      if (res) {
        if (!width && !height) return
        width = width ? `,w_${width}` : ''
        height = height ? `,w_${height}` : ''
        const url = oldImgUrl + '?x-oss-process'
        const resource = url.replace(/https?:\/\/[^\/]*/i, '')
        let ossObjName = oldImgUrl.replace(/https?:\/\/.*?\//i, '')
        ossObjName += newName
        const xOssProcess = `image/resize${width}${height}|sys/saveas,o_${base64.encode(ossObjName)}`
        let header = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-oss-date': new Date().toGMTString(),
          'x-oss-security-token': stsToken.SecurityToken
        }
        GetSignature(header, resource)
        basicHttp.post(url, { 'x-oss-process': xOssProcess }, header).then(res => {
          resolve({ url: ossObjName })
        }).catch(err => {
          console.error(err)
          resolve(false)
        })
      }
    })
  })
}

const GetSignature = function (header, url) {
  if (!stsToken) {
    return
  }
  let message = 'POST\n\n' + header['Content-Type'] + '\n' + new Date().toGMTString() + '\n'
  for (let key in header) {
    if (key.startsWith('x-oss-')) {
      message += key + ':' + header[key] + '\n'
    }
  }
  message += '/' + stsToken.BucketName + url
  // console.log(message)
  header['authorization'] = 'OSS ' + stsToken.AccessKeyId + ':' + crypto.util.bytesToBase64(hmac(sha1, message.substring(0, message.length), stsToken.AccessKeySecret, { asBytes: true }))
}

module.exports = {
  uploadFile: uploadFile, // 上传文件
  imageZoom
}