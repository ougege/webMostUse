/**
 * 国家/身份/城市 区域信息的工具类
 * yanglu
 */
import {CHN} from './CHN'
class AreaInfoUtil {
  constructor () {
    this.AreaDatas = []
    this.jsonFormat('CHN', CHN)
  }
  // 从包含整个国家的区域信息的json对象转换成得到需要的数据
  jsonFormat (countryCode, json) {
    if (!countryCode) {
      return false
    }
    this.AreaDatas[countryCode] = {}
    if (!json || !json.Provinces) {
      return false
    }
    let provinces = []
    let provinceCities = []
    let cities = []
    if (json.Provinces && Array.isArray(json.Provinces)) {
      json.Provinces.forEach(item => {
        if (!item || !item.ThisProvince) {
          return false
        }
        provinces.push(item.ThisProvince)
        if (item.ThisProvince.ProvinceCode) {
          provinceCities[item.ThisProvince.ProvinceCode] = item.Cities
        }
        item.Cities.forEach(city => {
          let tempCity = Object.assign({}, city)
          tempCity.ProvinceEnName = item.ThisProvince.ProvinceEnName
          tempCity.ProvinceCnName = item.ThisProvince.ProvinceCnName
          cities[city.CityCode] = tempCity
        })
      })
    }
    this.AreaDatas[countryCode].Provinces = provinces
    this.AreaDatas[countryCode].ProvinceCities = provinceCities
    this.AreaDatas[countryCode].Cities = cities
  }
  // 获取一个国家的所有省级区域
  GetProvincesInCountry (countryCode) {
    if (!countryCode) {
      countryCode = 'CHN'
    }
    let countryInfo = this.AreaDatas[countryCode]
    if (countryInfo) {
      return countryInfo.Provinces
    } else {
      return []
    }
  }
  // 获取中国一个省份的所有城市信息
  GetCitiesInProvinceCN (provinceCode) {
    if (!provinceCode) {
      provinceCode = '110000' // 默认为北京
    }
    let countryInfo = this.AreaDatas['CHN']
    if (countryInfo && countryInfo.ProvinceCities && countryInfo.ProvinceCities[provinceCode]) {
      return countryInfo.ProvinceCities[provinceCode]
    } else {
      return []
    }
  }
  // 通过城市代码直接获取城市信息
  GetCityInCityCode (cityCode) {
    if (!cityCode) {
      cityCode = '110100' // 默认北京市
    }
    let countryInfo = this.AreaDatas['CHN']
    if (countryInfo && countryInfo.Cities && countryInfo.Cities[cityCode]) {
      return countryInfo.Cities[cityCode]
    } else {
      return []
    }
  }
  // 通过城市名字获取城市坐标
  GetCityCodeByCityName (cityName) {
    if (!cityName) {
      cityName = '北京市' // 默认北京市
    }
    let cityObj
    let countryInfo = this.AreaDatas['CHN']
    for (let i in countryInfo.Cities) {
      if (countryInfo.Cities[i].CityCnName === cityName) {
        cityObj = countryInfo.Cities[i]
        break
      }
    }
    return cityObj
  }
}
let areaInfoUtil = new AreaInfoUtil()
export {areaInfoUtil}
