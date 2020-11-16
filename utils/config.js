var isDev = process.env.NODE_ENV === 'development'
var token = '' // 浏览器自用token
var host = 'http://test.api.kdkdcn.com/'
var ossHost = '//kdkdcn.cn'
var resourceHost = 'http://test.m.kdkdcn.com/'
var staticHost = 'http://localhost:8080/'
var activityResourceHost = 'https://test-u.kdkdcn.com/'
var activityStaticHost = 'https://test-u.kdkdcn.com/'
var liveShareUrl = 'https://image.kdkdcn.com/vedio/code.html'
var downloadIOS = 'https://apps.apple.com/cn/app/id1501316664'
var downloadAndroid = 'https://android.myapp.com/myapp/detail.htm?apkName=com.kaiqi.xintianyou&ADTAG=mobile'
var amapKey = '7acb6cbb0082e9a87c14b64762fc31d5' // 高德地图的key
var appToken = '' // app传入的token
var appUserId = '' // app传入的userId
var statusBarHeight = 0 // 状态栏高度
var keyboardHeight = 0 // 换算后的小键盘高度-安卓专用
var currentOrderNo = '' // 当前的订单No
var currentCoordinate = [120.25814, 30.22398] // 当前经纬度坐标
var defaultCenterPos = [120.25814, 30.22398]
var defaultCityArea = '杭州市萧山区'
// 是否可以跳回app
var isCanJumpApp = false
// 全局控制:是否在App内
var isInApp = false
var isBuildInH5 = true // 小程序内不能使用window对象,所以挂载jsBridge会抛错
var isIos = null // 是否是ios机型
var isTest = true // 测试
var isProduction = false // 是否正式环境
if (isDev) {
	token = 'd04e142a7ddaef2faed2f18ec8b34ad9'
	host = 'http://192.168.5.142:8280/'
	ossHost = '//kdkdcn.cn'
	resourceHost = 'http://test.m.kdkdcn.com/'
	staticHost = 'http://localhost:8080/'
}
if (isTest) {
	token = 'bb1935c0cf48bf2e4ee320f6ccae6cf1'
	host = 'https://test-api.kdkdcn.com/'
	ossHost = '//kdkdcn.cn'
	resourceHost = 'https://test-m.kdkdcn.com/'
	staticHost = 'https://test-m.kdkdcn.com/'
	activityResourceHost = 'https://test-u.kdkdcn.com/'
	activityStaticHost = 'http://192.168.5.126:8081/'
	liveShareUrl = 'https://image.kdkdcn.com/vedio/code.html'
}
if (isProduction) {
	token = 'bb1935c0cf48bf2e4ee320f6ccae6cf1'
	host = 'https://api.kdkdcn.com/'
	ossHost = '//kdkdcn.cn'
	resourceHost = 'https://m.kdkdcn.com/'
	staticHost = 'https://m.kdkdcn.com/'
	activityResourceHost = 'https://u.kdkdcn.com/'
	activityStaticHost = 'https://u.kdkdcn.com/'
	liveShareUrl = 'https://image.kdkdcn.com/vedio/code.html'
}
module.exports = {
	token: token,
	host: host,
	ossHost: ossHost,
	staticHost,
	resourceHost: resourceHost,
	activityResourceHost: activityResourceHost,
	activityStaticHost: activityStaticHost,
	liveShareUrl: liveShareUrl,
	downloadIOS: downloadIOS,
	downloadAndroid: downloadAndroid,
	isDev: isDev,
	isTest: isTest,
	appId: '',
	appKey: '',
	amapKey: amapKey,
	homepage: '/pages/main/main',
	defaultImg: {
		iconLianjie: '/static/img/icon_lianjie_blue.png',
		iconCry: '/static/img/network_time_out_cry.png',
		shareMiniBk: 'https://image.kdkdcn.com/h5/1601277336941.png',
		shareDetailBk: 'https://image.kdkdcn.com/wxApplet/1600003953129.png',
		paySuccess_bk: 'https://image.kdkdcn.com/wxApplet/1599632772273.png',
		assets: {
			auth1_bg: 'https://image.kdkdcn.com/wxApplet/1599793492905.png',
			auth1_triangleStar: 'https://image.kdkdcn.com/wxApplet/1599793862937.png',
			index_1: 'https://image.kdkdcn.com/wxApplet/1599632691384.jpg',
			index_2: 'https://image.kdkdcn.com/wxApplet/1599632733951.png',
			deleteIcon: 'https://image.kdkdcn.com/h5/1600238581250.svg',
			errorImg: 'https://image.kdkdcn.com/h5/1600238608333.png',
			singleActivity_icon_intro: 'https://image.kdkdcn.com/h5/1600241092810.png',
			singleActivity_icon_beautiful: 'https://image.kdkdcn.com/h5/1600241112126.png',
			singleActivity_icon_detail: 'https://image.kdkdcn.com/h5/1600241130448.png',
			singleActivity_detail_bk: 'https://image.kdkdcn.com/h5/1600241150288.png',
			singleActivity_search_empty: 'https://image.kdkdcn.com/h5/1600241182484.png',
			singleActivity_list_hot1: 'https://image.kdkdcn.com/h5/1600241196201.png',
			singleActivity_list_hot2: 'https://image.kdkdcn.com/h5/1600241207661.png',
			singleActivity_list_hot3: 'https://image.kdkdcn.com/h5/1600241218522.png',
			singleActivity_list_new: 'https://image.kdkdcn.com/h5/1600241239741.png',
			singleActivity_list_zhe: 'https://image.kdkdcn.com/h5/1600241250700.png',
			singleActivity_order_bk: 'https://image.kdkdcn.com/h5/1600241261704.png',
			singleActivity_red_packet: 'https://image.kdkdcn.com/wxApplet/1604570283974.png',
			newDownload_bk1: 'https://image.kdkdcn.com/h5/1600240902467.png',
			newDownload_bk2: 'https://image.kdkdcn.com/h5/1600240913821.png',
			newDownload_bk3: 'https://image.kdkdcn.com/h5/1600240926330.png',
			newDownload_bk4: 'https://image.kdkdcn.com/h5/1600240936368.png',
			newDownload_bk5: 'https://image.kdkdcn.com/h5/1600240947428.png',
			newDownload_bk6: 'https://image.kdkdcn.com/h5/1600240957095.png',
			newDownload_headImg1: 'https://image.kdkdcn.com/h5/1600240691448.png',
			newDownload_headImg2: 'https://image.kdkdcn.com/h5/1600240865837.png',
			newDownload_headImg3: 'https://image.kdkdcn.com/h5/1600240877576.png',
			newDownload_headImg4: 'https://image.kdkdcn.com/h5/1600240889446.png',
			liveDownload_bk1: 'https://image.kdkdcn.com/h5/1604984528680.png',
			liveDownload_bk2: 'https://image.kdkdcn.com/h5/1604984543013.png',
			wishPoolDetail_bg1: 'https://image.kdkdcn.com/wxApplet/1599633733151.png',
			orderDetail_ticket_bk: 'https://image.kdkdcn.com/h5/1601344352639.png',
			earnSecret_bg: 'https://image.kdkdcn.com/h5/1604283779216.png'
		}
	},
	ShareMessage: {
		title: '优质单身活动，快来奔现', // 当前小程序名称
		desc: '优质单身活动，快来奔现', // 描述
		imageUrl: 'https://image.kdkdcn.com/h5/1601277336941.png', // 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
		path: '/pages/index/index' // 当前页面 path ，必须是以 / 开头的完整路径
	},
	toastDuration: 1500,
	// 错误消息提示时间
	errorMsgDuration: 4000,
	// 收藏，取消提示时间
	errorMsgDurationForCollect: 1500,
	// 切换身份，提示时间
	chooseIdentityDuration: 2000,
	// token过期重新获取次数
	refreshTokenTimes: 1,
	refreshTokenBeforeSec: 60, // 授权到期前多少秒开始再次申请授权
	// oss文件存储的目录定义
	ossFilePaths: {
		payimage: 'payimage', // 支付凭证图片
		userlogo: 'userlogo' // 用户头像
	},
	reverseProxyAlias: {
		systemBackAPI: '/sys'
	},
	isInApp: isInApp, // 是否处在app内
	isIos: isIos, // 是否是ios机型
	appToken: appToken, // app传入的token
	appUserId: appUserId, // app传入的userId
	currentCoordinate: currentCoordinate, // 当前的坐标
	defaultCenterPos: defaultCenterPos, // 默认的中心坐标
	defaultCityArea: defaultCityArea, // 默认的城市区域
	statusBarHeight: statusBarHeight, // 状态栏高度
	keyboardHeight: keyboardHeight, // 小键盘高度
	currentOrderNo: currentOrderNo, // 订单id
	isBuildInH5: isBuildInH5, // 是否编译成h5
	isCanJumpApp: isCanJumpApp, // 是否可以跳回app
}
