class SendApp {
	constructor() {
		this.init()
	}
	init () {
		let platform = uni.getSystemInfoSync().platform
		this.isIos = platform === 'ios'
		console.log(this.isIos)
	}
	jumpToUrl (url) {
		try {
			let obj = {url: url}
			let jsonStr = this.toJson(obj)
			if (this.isIos) {
				window.webkit.messageHandlers.jumpToUrl.postMessage(jsonStr)
			} else {
				JsBridge.jumpToUrl(jsonStr)
			}
		} catch(error) {
			console.log(error)
		}
	}
	toJson (obj) {
		return JSON.stringify(obj)
	}
	// 保存图片-传递base64给app
	transImgBase64 (str) {
		try {
			let obj = {str: str}
			let jsonStr = this.toJson(obj)
			if (this.isIos) {
				window.webkit.messageHandlers.transImgBase64.postMessage(jsonStr)
			} else {
				JsBridge.transImgBase64(jsonStr)
			}
		} catch(error) {
			console.log(error)
		}
	}
	// 活动详情分享
	activityDetailShare (tourId, type) {
		// type: 1是微信朋友，2是朋友圈
		try {
			let obj = {tourId: tourId, type: type}
			let jsonStr = this.toJson(obj)
			if (this.isIos) {
				window.webkit.messageHandlers.activityDetailShare.postMessage(jsonStr)
			} else {
				JsBridge.activityDetailShare(jsonStr)
			}
		} catch(error) {
			console.log(error)
		}
	}
	// 学院列表跳转详情
	collegeListJumpDetail (url) {
		try {
			let obj = {url: url}
			let jsonStr = this.toJson(obj)
			if (this.isIos) {
				window.webkit.messageHandlers.collegeListJumpDetail.postMessage(jsonStr)
			} else {
				JsBridge.collegeListJumpDetail(jsonStr)
			}
		} catch(error) {
			console.log(error)
		}
	}
	// 点击左侧箭头自定义事件
	leftArrowModifyClick (tips) {
		try {
			// tips: arrowJumpToOrderList (跳转个人中心－订单列表) 
			let obj = {name: tips}
			let jsonStr = this.toJson(obj)
			if (this.isIos) {
				window.webkit.messageHandlers.leftArrowModifyClick.postMessage(jsonStr)
			} else {
				JsBridge.leftArrowModifyClick(jsonStr)
			}
		} catch(error) {
			console.log(error)
		}
	}
	// iosApp跳小程序
	appJumpMiniProgram (orderNo, url) {
		try {
			// 最后将url拼成 /pages/pay/index?orderNo=2020072919360001&token=4f70b0741f227b6460108129bbeeff83
			let obj = {orderNo: orderNo, url: url}
			let jsonStr = this.toJson(obj)
			console.log(jsonStr)
			if (this.isIos) {
				window.webkit.messageHandlers.appJumpMiniProgram.postMessage(jsonStr)
			} else {
				JsBridge.appJumpMiniProgram(jsonStr)
			}
		} catch(error) {
			console.log(error)
		}
	}
	// 安卓原生支付
	androidNativePay (orderNo, payType) {
		try {
			// payType 1：支付宝, 2:微信, 3:ios内购
			let obj = {orderNo: orderNo, payType: payType}
			let jsonStr = this.toJson(obj)
			console.log('-----支付调用------')
			if (this.isIos) {
				window.webkit.messageHandlers.androidNativePay.postMessage(jsonStr)
			} else {
				JsBridge.androidNativePay(jsonStr)
			}
		} catch(error) {
			console.log(error)
		}
	}
	// 分页单身避难所详情给app--分享朋友圈
	shareSingleActivityDetailToApp (shareObj) {
		try {
			// shareObj: '{title: "", img: "", url: "", type: 1, detail: ""}'
			// type: 1是微信朋友，2是朋友圈
			let jsonStr = this.toJson(shareObj)
			if (this.isIos) {
				window.webkit.messageHandlers.shareSingleActivityDetailToApp.postMessage(jsonStr)
			} else {
				JsBridge.shareSingleActivityDetailToApp(jsonStr)
			}
		} catch(error) {
			console.log(error)
		}
	}
	// 分享小程序单身避难所详情给微信--分享微信
	shareSingleActivityMiniDetailToWeChat (shareObj) {
		try {
			// shareObj: '{title: "", img: "", url: "", type: 1, detail: ""}'
			// type: 1是微信朋友，2是朋友圈
			let jsonStr = this.toJson(shareObj)
			if (this.isIos) {
				window.webkit.messageHandlers.shareSingleActivityMiniDetailToWeChat.postMessage(jsonStr)
			} else {
				JsBridge.shareSingleActivityMiniDetailToWeChat(jsonStr)
			}
		} catch(error) {
			console.log(error)
		}
	}
	// 搜索页获取焦点时弹出小键盘:安卓,ios
	popupKeyboardWhenFocus () {
		try {
			let str = ''
			if (this.isIos) {
				window.webkit.messageHandlers.popupKeyboardWhenFocus.postMessage(str)
			} else {
				JsBridge.popupKeyboardWhenFocus(str)
			}
		} catch(error) {
			console.log(error)
		}
	}
	// 活动列表-banner弹出vip提示
	popupActivityBannerVipToast () {
		try {
			let str = ''
			if (this.isIos) {
				window.webkit.messageHandlers.popupActivityBannerVipToast.postMessage(str)
			} else {
				JsBridge.popupActivityBannerVipToast(str)
			}
		} catch(error) {
			console.log(error)
		}
	}
	// 活动及详情-分享提示
	popupShareActivityToast (obj) {
		try {
			let jsonStr = this.toJson(obj)
			if (this.isIos) {
				window.webkit.messageHandlers.popupShareActivityToast.postMessage(jsonStr)
			} else {
				JsBridge.popupShareActivityToast(jsonStr)
			}
		} catch(error) {
			console.log(error)
		}
	}
}
let sendApp = new SendApp()
export {sendApp}