// pages/pay/pay.js
const app =  getApp();
import {login} from '../../utils/login.js';
const Login = new login();
import {userModel} from '../../models/user.js';
const user = new userModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    // 骨架屏相关
    showSkeleton: true,
    region: {
			header: true,
			lists: true
    },
    userInfo: {},
    firstId: null,
    isFirstBind: false,
    secondId: null,
    isSecondBind: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideLoading();
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo
    })
    this.getBindInfo()

  },
  getBindInfo() {
    user.getShopAccount().then(res => {
      const result = res.result.data
      this.setData({
        firstId: result.mt_account_id,
        isFirstBind: !!result.mt_account_id,
        secondId: result.eleme_account_id,
        isSecondBind: !!result.eleme_account_id,
        'region.header': false,
        'region.lists': false
      })
    })
  },
  inputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
      [field]: e.detail.value
    })
  },
  onBind(e) {
    const {field, bind} = e.currentTarget.dataset
    const companyId = this.data[field]
    const types = new Map()
    types.set('firstId', 'mt') // 美团
    types.set('secondId', 'eleme') // 饿了么
    user.bindShopAccountId(companyId, types.get(field)).then( res => {
      this.setData({
        [bind]: true
      })
    })
  },
  getUserInfo(e){
    if (e.detail.userInfo) {
      wx.showLoading({
        title: '登录中...',
        mask: true
      });
      Login.wxLogin();
      // this.setData({
      //   userInfo: e.detail.userInfo
      // })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})