import config from './config'
import api from './api'
import util from './util'
import {xtyStorage} from './common/xtyStorage'
import selectOptions from './selectOptions'
import Bus from '../utils/common/eventBus'
import {sendApp} from './communications/sendApp'
const wecanlendar = require('wecalendar')
const wecal = require('wecal')
const weverifycode = require('weverifycode')
const weimgtobase64 = require('weimgtobase64')
const weimgcompress = require('weimgcompress')
const wewevalidator = require('wewevalidator')
module.exports = {
  config: config,
  api: api,
  util: util,
  xtyStorage: xtyStorage,
  selectOptions: selectOptions,
  Bus: Bus,
  wecanlendar: wecanlendar,
  wecal: wecal,
  weverifycode: weverifycode,
  weimgtobase64: weimgtobase64,
  weimgcompress: weimgcompress,
  wewevalidator: wewevalidator,
  sendApp: sendApp,
}