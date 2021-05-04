import { HTTP } from '../utils/http.js'
class userModel extends HTTP {
  // 获取用户信息
  constructor() {
    super()
    this.userId = wx.getStorageSync('userId')
  }
  // 店铺信息获取
  getShopInfo(shopIds, startTime, endTime, type) {
    return this.request({
      url: 'shop/info',
      data: {
        shop_id: shopIds,
        start_time: startTime,
        end_time: endTime,
        type
      }
    })
  }
  // 店铺评价统计
  getShopReview(shopId) {
    return this.request({
      url: 'shop/review',
      data: {
        shop_id: shopId
      }
    })
  }
  // 获取默认评价回复列表
  getShopReply(shopId) {
    return this.request({
      url: 'shop/getReply',
      data: {
        shop_id: shopId
      }
    })
  }
  // 设置默认评价回复内容
  setShopReply(shopId, num, reply) {
    return this.request({
      url: 'shop/setReply',
      method: 'post',
      data: {
        shop_id: shopId,
        num,
        reply
      }
    })
  }
   // 设置店铺出单时间
  setShopTime(shopId, time, status) {
    return this.request({
      url: 'shop/setShopTime',
      method: 'post',
      data: {
        shop_id: shopId,
        out_order_time: time,
        status
      }
    })
  }
  // 获取当前客户绑定的店铺信息
  getShopAccount() {
    const openId = wx.getStorageSync('openId')
    return this.request({
      url: 'shop/getAccount',
      data: {
        openid: openId
      }
    })
  }
  // 绑定店铺ID
  bindShopAccountId(shopId, type) {
    const openId = wx.getStorageSync('openId')
    return this.request({
      url: 'shop/bindAccountId',
      data: {
        openid: openId,
        account_id: shopId,
        type
      }
    })
  }
  // 店铺自动回复开启关闭设置
  bindShopReview(shopId, status) {
    return this.request({
      url: 'shop/setShopReview',
      data: {
        shop_id: shopId,
        status
      }
    })
  }
}
export {
  userModel
}