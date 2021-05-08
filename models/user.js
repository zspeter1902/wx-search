import { HTTP } from '../utils/http.js'
class userModel extends HTTP {
  // 获取用户信息
  constructor() {
    super()
    this.userId = wx.getStorageSync('userId')
  }
  // 店铺基础数据
  getBase() {
    const openId = wx.getStorageSync('openId')
    return this.request({
      url: 'shop/customerInfo',
      data: {
        openid: openId
      }
    })
  }
  // 店铺信息获取
  getShopInfo(startTime, endTime) {
    const openId = wx.getStorageSync('openId');
    return this.request({
      url: 'shop/info',
      method: 'POST',
      data: {
        openid: openId,
        start_time: startTime,
        end_time: endTime
      }
    })
  }
  // 店铺评价统计
  getShopReview() {
    const openId = wx.getStorageSync('openId');
    return this.request({
      url: 'shop/review',
      data: {
        openid: openId
      }
    })
  }
  // 获取默认评价回复列表
  getShopReply(shopName) {
    return this.request({
      url: 'shop/getReply',
      data: {
        shop_name: shopName
      }
    })
  }
  // 设置默认评价回复内容
  setShopReply(shopName, num, reply) {
    return this.request({
      url: 'shop/setReply',
      method: 'post',
      data: {
        shop_name: shopName,
        num,
        reply
      }
    })
  }
  // 获取店铺出单列表
  getOrders() {
    const openId = wx.getStorageSync('openId');
    return this.request({
      url: 'shop/getRealTimeOrders',
      data: {
        openid: openId
      }
    })
  }
  // 设置店铺出单时间
  setShopTime(shopName, status, time = 15) {
    return this.request({
      url: 'shop/setShopTime',
      method: 'post',
      data: {
        shop_name: shopName,
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
  bindShopAccountId(mtId, elemeId) {
    const openId = wx.getStorageSync('openId')
    return this.request({
      url: 'shop/bindAccountId',
      data: {
        openid: openId,
        mt_account_id: mtId,
        eleme_account_id: elemeId
      }
    })
  }
  // 店铺自动回复开启关闭设置
  bindShopReview(shopName, status) {
    return this.request({
      url: 'shop/setShopReview',
      data: {
        shop_name: shopName,
        status
      }
    })
  }
  // 获取统计店铺自动回复数量
  getReplyStatistics() {
    const openId = wx.getStorageSync('openId')
    return this.request({
      url: 'shop/autoReviewCount',
      data: {
        openid: openId
      }
    })
  }
}
export {
  userModel
}