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
    region: {
			header: true,
			lists: true
    },
    base: app.globalData.picUrl,
    banner: '',
    loading: false,
    info: {
      brandName: '伊索美智钵钵鸡',
      img: '/images/store_logo.png',
      time: '2021-4-22'
    },
    activeTab: 0,
    tabs: [
      {
        title: '店铺详情',
        title2: '小程序开发进阶',
        img: 'http://mmbiz.qpic.cn/sz_mmbiz_jpg/GEWVeJPFkSEV5QjxLDJaL6ibHLSZ02TIcve0ocPXrdTVqGGbqAmh5Mw9V7504dlEiatSvnyibibHCrVQO2GEYsJicPA/0?wx_fmt=jpeg',
        desc: '本视频系列课程，由腾讯课堂NEXT学院与微信团队联合出品，通过实战案例，深入浅出地进行讲解。'
      },
      {
        title: '出单详情',
        title2: '微信小程序直播',
        img: 'http://mmbiz.qpic.cn/sz_mmbiz_png/GEWVeJPFkSHALb0g5rCc4Jf5IqDfdwhWJ43I1IvriaV5uFr9fLAuv3uxHR7DQstbIxhNXFoQEcxGzWwzQUDBd6Q/0?wx_fmt=png',
        desc: '微信小程序直播系列课程持续更新中，帮助大家更好地理解、应用微信小程序直播功能。'
      },
      {
        title: '评价回复',
        title2: '常见问题和解决方案',
        img: 'http://mmbiz.qpic.cn/sz_mmbiz_jpg/GEWVeJPFkSGqys4ibO2a8L9nnIgH0ibjNXfbicNbZQQYfxxUpmicQglAEYQ2btVXjOhY9gRtSTCxKvAlKFek7sRUFA/0?wx_fmt=jpeg',
        desc: '提高审核质量'
      }],
    active: 0,
    // 顶部条
    isBar: false,
    viewHeight: 0,
    // other
    timer1: null,
    timer2: null
  },
  //options(Object)
  onLoad: function(options){
    // 获取信息
    this.getStoreData()
    this.getBase()
    //隐藏骨架屏
    this.data.timer1 = setTimeout(() => {
			this.setData({
        'region.header': false
			})
		}, 300)
		this.data.timer2 = setTimeout(() => {
			this.setData({
				'region.lists': false
			})
    }, 600)
  },
  getBase() {
    let query = wx.createSelectorQuery()
    query.select('.view-base').boundingClientRect(rect => {
      let height = rect.height
      this.setData({
        viewHeight: height
      })
    }).exec()
    // user.getShopInfo()
  },
  getStoreData() {
    this.setData({
      loading: true
    })
    this.setData({
      loading: false
    })
  },
  onChangeActive(e) {
    this.setData({
      active: e.detail
    })
  },

  onReady: function(){

  },
  onShow: function(){
  },
  onHide: function(){

  },
  onPageScroll(e) {
    util.throttle(() => {
      this.setData({
        isBar: e.scrollTop > this.data.viewHeight - 60
      })
    })()
  },
  onUnload: function(){
    clearTimeout(this.data.timer1)
    clearTimeout(this.data.timer2)
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
