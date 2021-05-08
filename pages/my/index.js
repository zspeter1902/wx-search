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
    loading: true,
    type: 'dot-gray', //dot-gray circle
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
    this.getBindInfo()
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo
      })
    }
    setTimeout(() => {
      this.setData({
        loading: false
      })
    }, 1500)
  },
  getBindInfo() {
    const token = wx.getStorageSync('token');
    if (!token) {
      return
    }
    user.getShopAccount().then(res => {
      const result = res.data
      this.setData({
        firstId: result.mt_account_id,
        isFirstBind: !!result.mt_account_id,
        secondId: result.eleme_account_id,
        isSecondBind: !!result.eleme_account_id
      })
    })
  },
  inputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
      [field]: e.detail.value
    })
  },
  onEdit(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
      [field]: false
    })
  },
  onBind() {
    user.bindShopAccountId(this.data.firstId, this.data.secondId).then(() => {
      this.setData({
        'isFirstBind': !!this.data.firstId,
        'isSecondBind': !!this.data.secondId
      })
    })
  },
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: res => {
        wx.setStorageSync('userInfo', res.userInfo)
        this.setData({
          loading: true,
          type: 'circle'
        })
        Login.wxLogin(() => {
          this.getBindInfo()
          this.setData({
            userInfo: res.userInfo
          })
          this.setData({
            loading: false,
            type: 'dot-gray'
          })
        });
      }
    })
  },
  isLogin() {
    const token = wx.getStorageSync('token');
    return !!token
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