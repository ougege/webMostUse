/**
 * 统一管理storage
 * yanglu
 */
const xtyStorage = {
	// 列表
	loginUserInfo: 'loginUserInfo', // 授权用户信息
	loginTokenInfo: 'loginTokenInfo', // 用户登录信息
	activityInfo: 'activityInfo', // 活动信息
	orderInfo: 'orderInfo', // 订单信息
	lastPageUrl: 'lastPageUrl', // 记录没有token访问的最后一页
	promoter: 'promoter', // 推广员
	// 设置缓存
	set (key, value) {
		uni.setStorageSync(key, value)
	},
	// 获取缓存
	get (key) {
		return uni.getStorageSync(key)
	},
	// 删除缓存
	remove (key) {
		uni.removeStorageSync(key)
	},
	// 清空所有缓存
	clear () {
		uni.clearStorageSync()
	}
}
export {xtyStorage}