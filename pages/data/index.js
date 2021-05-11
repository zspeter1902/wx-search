//index.js
//获取应用实例
const app = getApp()
import {login} from '../../utils/login.js';
import util from '../../utils/util.js';
import {userModel} from '../../models/user.js';

const Login = new login();
const user = new userModel()
//Page Object
Page({
  data: {
    // 骨架屏相关
    showSkeleton: true,
    base: app.globalData.picUrl,
    loading: true,
    info: {},
    tabs: [
      {
        title: '店铺详情'
      },
      {
        title: '出单详情'
      },
      {
        title: '评价回复'
    }],
    tabsData: [],
    active: 0,
    // 顶部条
    isBar: false,
    viewHeight: 0,
    isRefresh: false
  },
  //options(Object)
  onLoad: function(options){
    // 获取信息
    this.getBase()
  },
  getBase() {
    let query = wx.createSelectorQuery()
    query.select('.view-base').boundingClientRect(rect => {
      let height = rect.height
      this.setData({
        viewHeight: height
      })
    }).exec()
    Login.checkLogin(() => {
      user.getBase().then(res => {
        this.setData({
          info: res.data,
          loading: false
        })
      })
    })
  },
  onChangeActive(e) {
    this.setData({
      active: e.detail
    })
  },

  onReady: function() {
  },
  onShow: function() {
    const token = wx.getStorageSync('token');
    if (!token) {
      this.setData({
        isRefresh: true
      })
    } else if (this.data.isRefresh) {
      this.setData({
        isRefresh: false
      })
      this.onLoad()
    }
  },
  onHide: function() {
  },
  onPageScroll(e) {
    util.throttle(() => {
      this.setData({
        isBar: e.scrollTop > this.data.viewHeight - 60
      })
    })()
  },
  onUnload: function() {
  },
   /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: function(){
  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){
  }
});
