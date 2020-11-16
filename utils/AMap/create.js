import config from '../config'
import Bus from '../eventBus.js'
class CreateAMap {
	constructor() {
		this.init()
	}
	init () {
		console.log('开始动态加载高德')
		window.initAMap = () => {
			Bus.$emit('AMapIsExist', null)
		}
		let plugins = 'AMap.Driving,AMap.Geocoder,AMap.Walking,AMap.Riding,AMap.Transfer,AMap.Geolocation'
		let script = document.createElement('script')
		script.type = 'text/javascript'
		script.async = true
		script.src = `https://webapi.amap.com/maps?v=1.4.15&callback=initAMap&key=${config.amapKey}&plugin=${plugins}`
		// script.onerror = reject
		document.head.appendChild(script)
	}
}
let createAMap = new CreateAMap()
export {createAMap}