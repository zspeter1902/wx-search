import { HTTP } from '../utils/http.js'
import { config } from '../config.js'
class userModel extends HTTP {
  // 获取用户信息
  constructor() {
    super()
    this.userId = wx.getStorageSync('userId')
  }
  // 邀请码验证
  verificationCode(code) {
    return this.request({
      url: config.api_base_url + 'verificationCode',
      data: {
        code
      }
    })
  }
  // 店铺诊断、容量分类
  shopDiagnosisList() {
    return this.request({
      url: config.api_base_url + 'shopDiagnosisList'
    })
  }
  // 美团目标店铺搜索
  mtStoreSearch(data) {
    return this.request({
      url: `${config.api_base_url2}MtApp/ShopSearch`,
      data: {
        province_name: data.province,
        city_name: data.city,
        shop_name: data.name,
        longitude: data.longitude,
        latitude: data.latitude,
        source: 'wechat'
      }
    })
  }
  // 美团目标店铺详情
  mtStoreDetail(data, detail) {
    return this.request({
      url: `${config.api_base_url2}MtApp/RestInfo?province_name=${data.province}&city_name=${data.city}&shop_name=${data.name}&longitude=${data.longitude}&latitude=${data.latitude}&source=wechat`,
      method: 'POST',
      data: detail
    })
  }
  // 美团商圈店铺搜素
  mtStoresSearch(data) {
    return this.request({
      url: `${config.api_base_url2}MtApp/ShopSearch`,
      data: {
        province_name: data.province,
        city_name: data.city,
        shop_name: data.name,
        longitude: data.longitude,
        latitude: data.latitude,
        category_name: data.category,
        source: 'wechat'
      }
    })
  }
  // 饿了么目标店铺搜索
  elemeStoreSearch(data) {
    return this.request({
      url: `${config.api_base_url2}EleApp/ShopSearch`,
      data: {
        province_name: data.province,
        city_name: data.city,
        shop_name: data.name,
        longitude: data.longitude,
        latitude: data.latitude,
        source: 'wechat'
      }
    })
  }
  // 饿了么目标店铺详情
  elemeStoreDetail(data, detail) {
    return this.request({
      url: `${config.api_base_url2}EleApp/RestInfo?province_name=${data.province}&city_name=${data.city}&shop_name=${data.name}&longitude=${data.longitude}&latitude=${data.latitude}&source=wechat`,
      method: 'POST',
      data: detail
    })
  }
  // 饿了么商圈店铺搜索
  elemeStoresSearch(data) {
    return this.request({
      url: `${config.api_base_url2}EleApp/CategoryShopList`,
      data: {
        province_name: data.province,
        city_name: data.city,
        shop_name: data.name,
        longitude: data.longitude,
        latitude: data.latitude,
        category_name: data.category,
        source: 'wechat'
      }
    })
  }
}
export {
  userModel
}