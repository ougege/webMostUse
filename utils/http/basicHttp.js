/// 基础的HTTP请求工具，封装了uni.request
// import config from '../config'
let allRequest = []
let allRequest2 = {}
export const abortAllRequest = function () {
  if (allRequest && allRequest.length > 0) {
    for (let i = 0; i < allRequest.length; i++) {
      allRequest[i] && allRequest[i].abort()
    }
    allRequest = []
    allRequest2 ={}
    uni.hideNavigationBarLoading()
  }
}
//监听全局的请求是否完成
export const isAllRequestOver = function(){
  console.log(allRequest2)
  return Object.keys(allRequest2).length===0
}

export const get = function (url, data, header = {}) {
  return new Promise((resolve, reject) => {
    // uni.showNavigationBarLoading()
    // 所有get请求统一拦截加时间戳
    let requestDate = new Date().getTime()
    url = url.includes('?') ? `${url}&t=${requestDate}` : `${url}?t=${requestDate}`
    var requestTask = uni.request({
      url,
      data,
      header,
      method: 'GET',
      complete (resp) {
        delete allRequest2[requestDate];
        uni.hideNavigationBarLoading()
        uni.stopPullDownRefresh()
        if (resp.statusCode === 200) {
          if (resp.data.code && resp.data.succeeded === false) {
            reject(resp)
          } else {
            resolve(resp)
          }
        } else {
          reject(resp)
        }
      }
    })
    allRequest.push(requestTask)

    allRequest2[requestDate] = requestTask
  })
}

export const post = function (url, data, header = {}) {
  // uni.showNavigationBarLoading()
  let requestDate = new Date().getTime()
  return new Promise((resolve, reject) => {
    var requestTask = uni.request({
      url,
      data,
      header,
      method: 'POST',
      complete(resp) {
        console.log(resp)
        delete allRequest2[requestDate];
        uni.hideNavigationBarLoading()
        uni.stopPullDownRefresh()
        if (resp.statusCode === 200) {
          if (resp.data.code && resp.data.succeeded === false) {
            reject(resp)
          } else {
            resolve(resp)
          }
        } else {
          reject(resp)
        }
      }
    })
    allRequest.push(requestTask)
    
    allRequest2[requestDate] = requestTask
  })
}






