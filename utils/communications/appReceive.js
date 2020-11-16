import config from '../config'
import Bus from '../common/eventBus.js'
import util from '../util'
const jsBridge = {
	/**
	 * 初始化用户信息:供app执行load调用,isInApp 全局控制变量
	 * pageStack: 页面栈层级 1是tab；　2是带返回键; 默认值2
	 * @param userInfo 用户信息JSON {token: '', userId: '', pageStack: ''}
	 */
	init (userInfo) {
		config.isInApp = true
		// 测试json
		// '{"token": "deb5cfe6deb55c4e1416618354a1b844", "userId": 29, "pageStack": 1}'
		let platform = uni.getSystemInfoSync().platform
		config.isIos = platform === 'ios'
		if (userInfo) {
			let userObj = JSON.parse(userInfo)
			config.appToken = userObj.token || ''
			config.appUserId = userObj.userId || ''
			config.pageStack = userObj.pageStack || 2
			let info = {token: config.appToken, userId: config.appUserId, pageStack: config.pageStack}
			let loginTokenInfo = util.xtyStorage.loginTokenInfo
			util.xtyStorage.set(loginTokenInfo, JSON.stringify(info))
		}
	},
	/**
	 * 活动详情页打卡分享弹框
	 * * @param idNumberInfo 用户信息JSON {sharer: '分享人昵称', idNumber: '分享人id'}
	 */
	activityDetailShareDialog (idNumberInfo) {
		Bus.$emit('activityDetailShareDialogShow', idNumberInfo)
	},
	/**
	 * 当前位置坐标更新:app定时调用
	 * * @param coordinateInfo 用户当前坐标json {longitude: '经度', latitude: '纬度'}
	 * 示例 '{"longitude": 120.25814, "latitude": 30.22398}'
	 */
	updateCoordinate (coordinateInfo) {
		if (coordinateInfo) {
			let coordinateObj = JSON.parse(coordinateInfo)
			config.currentCoordinate = [Number(coordinateObj.longitude), Number(coordinateObj.latitude)]		
		}
	},
	/**
	 * 缘分球记录页变更编辑状态
	 */
	// luckyBallRecordChangeEditStatus () {
	// 	Bus.$emit('luckyBallRecordListChangeEditStatus', null)
	// },
	/**
	 * 初始化导航栏高度: statusBarHeight 全局控制变量
	 * @param statusBarInfo 用户信息JSON {statusBarHeight: ''}
	 */
	initStatusBarHeight (statusBarInfo) {
		// '{"statusBarHeight": "44"}'
		if (statusBarInfo) {
			let barObj = JSON.parse(statusBarInfo)
			console.log(statusBarInfo)
			let barHeight = config.isIos ? Number(barObj.statusBarHeight) * 2 : Number(barObj.statusBarHeight)
			config.statusBarHeight = barHeight
			Bus.$emit('updateStatusBarHeight', config.statusBarHeight)
		}
	},
	/**
	 * 全局自定义返回上一页
	 */
	returnPrevPage () {
		let url = location.pathname
		// 支付页面拦截,弹出dialog
		let tips = 'arrowAcvitityListBack'
		// 订单页面特殊处理
		if (url == '/pages/singleActivity/payOrder') {
			Bus.$emit('payOrderShowLeaveDialog', null)
		} else {
			// 判断页面栈,大于1返回上一页，等于1直接销毁
			let pages = getCurrentPages()
			if (pages.length > 1) {
				util.commonViewTap('', 99)
			} else {
				util.sendApp.leftArrowModifyClick(tips)
			}
		}
	},
	/**
	 * 安卓订单支付完成回跳:杀掉支付页面,打开订单详情
	 */
	androidJumpOrderDetailAfterPay (orderInfo) {
		// console.log('---------')
		let orderObj = JSON.parse(orderInfo)
		let timeStamp = util.newTimeStamp()
		// console.log(timeStamp)
		// '{"orderNo": "44"}'
		// 区分俩种情况,1:订单详情=>支付；2:活动列表=>活动详情=>支付
		let pages = getCurrentPages()
		// console.log('进入判断length')
		// util.commonViewTap('', 99)
		// setTimeout(function () {
		// 	util.commonViewTap(`/pages/singleActivity/orderDetail?orderNo=${orderObj.orderNo}&leftArrow=prev&t=${timeStamp}`)
		// }, 1000)
		if (pages.length > 2) {
			// console.log('length 大于2')
			util.commonViewTap('', 99)
			setTimeout(function () {
				util.commonViewTap(`/pages/singleActivity/orderDetail?orderNo=${orderObj.orderNo}&leftArrow=prev&t=${timeStamp}`)
			}, 1000)
		} else if (pages.length == 1) {
			// console.log('length 等于1')
			util.commonViewTap(`/pages/singleActivity/orderDetail?orderNo=${orderObj.orderNo}&t=${timeStamp}`, 3)
		} else {
			// console.log('等于2')
			util.commonViewTap('', 99)
			Bus.$emit('orderDetailReRender', orderObj.orderNo)
		}
	},
	/**
	 * 安卓键盘覆盖输入框hack
	 */
	// 弹起
	androidKeyboardPopup (keyboardInfo) {
		// '{"keyboardHeight": "44", "wholeHeight": ""}'
		if (keyboardInfo) {
			let barObj = JSON.parse(keyboardInfo)
			let keyboardHeight = Number(barObj.keyboardHeight)
			let wholeHeight = Number(barObj.wholeHeight)
			let sysInfo = util.getSystemInfoSync()
			let scalePercent = (keyboardHeight / wholeHeight) * sysInfo.systemInfo.windowHeight
			config.keyboardHeight = scalePercent
			Bus.$emit('keyboardPopupRender', config.keyboardHeight)
		}
	},
	// 收起
	androidKeyboardPopdown () {
		Bus.$emit('keyboardPopdownRender', null)
	}
}
export {jsBridge}