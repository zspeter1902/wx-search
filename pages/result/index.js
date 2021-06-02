//index.js
//获取应用实例
const app = getApp()
import util from '../../utils/util.js';
import {userModel} from '../../models/user.js';

const user = new userModel()
//Page Object
Page({
  data: {
    // 顶部条
    platformArray: wx.getStorageSync('platformArray'),
    platformIndex: wx.getStorageSync('platformIndex'),
    isBar: false,
    capacityEntries: {
      '五星': 5,
      '三星': 3,
      '一星': 1
    },
    storeInfo: {},
    checkboxItems: [],
    diagnosisList: [],
    capacityList: [],
    formData: {},
    checked: true,
    rules: [{
      name: 'diagnosis',
      rules: [{type: Array, minlength: 1, message: '请选择店铺诊断'}]
    }, {
      name: 'capacity',
      rules: [{required: true, message: '请选择商圈容量'}]
    }],
    loading: false
  },
  //options(Object)
  onLoad: function(options){
    // 获取缓存信息
    const data = wx.getStorageSync('formData');
    const storeDetail = JSON.parse(wx.getStorageSync('storeDetail'));
    const category = wx.getStorageSync('category');
    const platformIndex = wx.getStorageSync('platformIndex')
    const type = this.data.platformArray[platformIndex]
    // promise请求数据
    let getStoreInfo, getBusinessArea
    const getDiagnosisList = user.shopDiagnosisList()
    // 打开loading
    this._openLoading()
    // 美团 与 饿了么
    if (type === '美团') {
      getStoreInfo = user.mtStoreDetail(data, storeDetail)
      getBusinessArea = user.mtStoresSearch(Object.assign({}, data, {category: category}))
      Promise.all([getStoreInfo, getBusinessArea, getDiagnosisList]).then(res => {
        // 获取当前店铺信息
        this.getStoreInfo(res[0])
        // 获取商圈店铺
        this.getBusinessArea(res[1])
        // 获取店铺诊断 、商圈容量
        this.getDiagnosisList(res[2].data)
        // 关闭loading
        this._closeLoading()
      })
    } else {
      getStoreInfo = user.elemeStoreDetail(data, storeDetail)
      Promise.all([getStoreInfo, getDiagnosisList]).then(res => {
        // 获取当前店铺信息
        const storeInfo = res[0]
        for (let item of storeDetail.supportTags) {
          storeInfo.activities.push(item.text)
        }
        this.getStoreInfo(storeInfo)
        // 获取店铺诊断 、商圈容量
        this.getDiagnosisList(res[1].data)
        return user.elemeStoresSearch(Object.assign(
          {}, data, {category: storeInfo.category}
        ))
      }).then(res => {
        // 获取商圈店铺
        this.getBusinessArea(res)
        // 关闭loading
        this._closeLoading()
      })
    }
  },
  getStoreInfo(info) {
    this.setData({
      storeInfo: info
    })
  },
  getBusinessArea(info) {
    this.setData({
      checkboxItems: info
    })
  },
  getDiagnosisList(info) {
    this.setData({
      diagnosisList: info.diagnosis,
      capacityList: info.capacity
    })
  },
  onSwitch(e) {
    this.setData({
      'checked': e.detail
    })
  },
  checkboxChange (e) {
    // 最多选中3个
    if (this.data.formData.business && this.data.formData.business.length >= 3) {
      wx.showToast({
        title: '最多选择三个店铺',
        icon: 'none'
      });
    }
    this.setData({
      'formData.business': e.detail.value
    })
  },
  checkboxChangeDiagnosis(e) {
    this.setData({
      'formData.diagnosis': e.detail.value
    })
  },
  radioChangeCapacity(e) {
    this.setData({
      'formData.capacity': e.detail.value
    })
  },
  formSubmit(e) {
    this.selectComponent('#form').validate((valid, errors) => {
      const business = this.data.formData.business
      const checked = this.data.checked
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          wx.showToast({
            icon: 'error',
            title: errors[firstError[0]].message
          })
        }
      } else if (checked) {
        if (!business || !business.length) {
          wx.showToast({
            icon: 'error',
            title: '请选择店铺'
          })
        } else if (business.length > 3) {
          wx.showToast({
            icon: 'error',
            title: '最多三个店铺'
          })
        } else {
          this.onHttpSubmit()
        }
      } else {
        this.onHttpSubmit()
      }
    })
  },
  onHttpSubmit() {
    wx.navigateTo({
      url: '/pages/result/pdf/index',
      success: (res) => {
        /**
         * 店铺列表
         */
        res.eventChannel.emit('pdfData', {
          storeInfo: this.data.storeInfo,
          checkboxItems: this.data.checkboxItems,
          diagnosisList: this.data.diagnosisList,
          capacityList: this.data.capacityList,
          formData: this.data.formData,
        })
      },
    })
  },
  _openLoading() {
    this.setData({
      loading: true
    })
  },
  _closeLoading() {
    this.setData({
      loading: false
    })
  },
  onReady: function() {
  },
  onShow: function() {
  },
  onHide: function() {
  },
  onPageScroll(e) {
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
