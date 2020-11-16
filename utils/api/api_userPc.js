import axios from '../common/request'
import config from '../config'

// tour-list
export const getTourList = (params) => { return axios.post( config.staticHost + 'api/tour/list', params).then(res => res.data) }
// tour-detail
export const tourGet = (params) => { return axios.get( config.staticHost + 'api/tour/get', {params}).then(res => res.data) }
// 商户后台-文件上传
export const uploadFile = (params) => { return axios.post(config.staticHost + 'api/file/upload', params, {headers: {'content-type': 'multipart/form-data'}}).then(res => res.data) }
// 缘分球商家-打卡商家详情
export const fateBusinessDetails = (params) => { return axios.post( Const.NET.END_POINT + 'fateBusiness/details' + '/' + params.fateBusinessId).then(res => res.data) }