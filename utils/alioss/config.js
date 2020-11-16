const app = getApp()
import config from '../config'
const aliyunPolicyUrl = config.host + '/cid/api/v1/user/genPostPolicyForEntity'
const getStsTokenUrl = config.host + '/cid/api/v1/user/GetSTSToken'
var config = {
  aliyunPolicyUrl,
  getStsTokenUrl
};
module.exports = config