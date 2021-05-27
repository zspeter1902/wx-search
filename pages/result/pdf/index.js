import {userModel} from '../../../models/user.js';
const user = new userModel()
import Store from '../../../palette/store';
Page({
  data: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    capacityEntries: {
      '五星': 5,
      '三星': 3,
      '一星': 1
    },
    platformArray: wx.getStorageSync('platformArray'),
    // 顶部条
    storeInfo: {},
    checkboxItems: [],
    diagnosisList: [],
    capacityList: [],
    formData: {},
    src: '',
    paintPallette: null,
    isAuthorize: false,
    watermarkNum: 1,
    isSave: false,
    loading: false
  },
  //options(Object)
  onLoad: function(options){
    // 获取信息
    if (options.rest_id) {
      this.getData(options)
    }
    this.data.eventChannel = this.getOpenerEventChannel()
    //获取订单列表页面传来的数据
    if (JSON.stringify(this.data.eventChannel) !== '{}') {
      this.data.eventChannel.on('pdfData', (res) => {
        // 处理并返回数据
        this.setData({
          storeInfo: res.storeInfo,
          checkboxItems: res.checkboxItems,
          diagnosisList: res.diagnosisList,
          capacityList: res.capacityList,
          formData: res.formData,
        })
        this.calcWaterMarkNum()
        this.getInfo()
      })
    }
  },
  calcWaterMarkNum() {
    wx.createSelectorQuery().select('.watermark').boundingClientRect((rect) => {
      const height = rect.height - this.data.statusBarHeight
      // 750 * 1334
      const imgHeight = 1334 * rect.width / 750
      this.setData({
        watermarkNum: Math.ceil(height / imgHeight)
      })
    }).exec()
  },
  getInfo() {
    new Store().palette({
      storeInfo: this.data.storeInfo,
      businessItems: this.data.checkboxItems,
      diagnosisList: this.data.diagnosisList,
      capacityList: this.data.capacityList,
      formData: this.data.formData
    }).then(res => {
      this.setData({
        paintPallette: res,
      });
    })
    // wx.createSelectorQuery().select('.layout').boundingClientRect((rect) => {
    //   new Store().palette({
    //     height: rect.height,
    //     top: this.data.statusBarHeight + 5,
    //     storeInfo: this.data.storeInfo,
    //     checkboxItems: this.data.checkboxItems,
    //     diagnosisList: this.data.diagnosisList,
    //     capacityList: this.data.capacityList,
    //     formData: this.data.formData
    //   }).then(res => {
    //     this.setData({
    //       paintPallette: res,
    //     });
    //   })
    // }).exec()
  },
  onImgOK(e) {
    // setTimeout(() => {
      wx.hideLoading();
      this.data.src = e.detail.path;
      if (this.data.isSave) {
        this.data.isSave = false
        this.onSave()
      }
      console.log(this.data.src)
    // }, 1500)
  },
  onSave() {
    const that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum'] && res.authSetting['scope.writePhotosAlbum'] !== undefined) {
          that.setData({
            isAuthorize: true
          })
        } else {
          if (that.data.src && typeof that.data.src === 'string') {
            that.setData({
              isAuthorize: false
            })
            wx.saveImageToPhotosAlbum({
              filePath: that.data.src,
            });
          } else {
            that.data.isSave = true
            wx.showLoading({
              title: '保存中',
              mask: true,
            });
            // that.getInfo()
          }
        }
      }
    })

  },
  openSetting(e) {
    if (e.detail.authSetting['scope.writePhotosAlbum']) {
      this.setData({
        isAuthorize: false
      })
    }
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
  // 分享的数据
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
  getData(options) {
    const data = {
      "address": options.address,
      "latitude": options.latitude,
      "longitude": options.longitude,
      "province": options.province,
      "city": options.city,
      "name": options.rest_name,
      "category": options.category
    };
    const storeDetail = {
      "activities": JSON.parse(options.activities),
      "address": options.address,
      "category": options.category,
      "deliveryMode": options.deliveryMode,
      "deliveryTime": options.deliveryTime,
      "distance": options.distance,
      "latitude": options.latitude,
      "logo": options.logo,
      "min_price_tip": options.min_price_tip,
      "monthly_sales": options.monthly_sales,
      "opening_hours": options.opening_hours,
      "rest_id": options.rest_id,
      "rest_name": options.rest_name,
      "score": options.score,
      "shipping_fee_tip": options.shipping_fee_tip
    };
    const platformArray = wx.getStorageSync('platformArray')
    const type = platformArray[options.platformIndex]
    // promise请求数据
    let getStoreInfo, getBusinessArea
    const getDiagnosisList = user.shopDiagnosisList()
    // 打开loading
    this._openLoading()
    this.setData({
      ['formData.business']: JSON.parse(options.business),
      ['formData.diagnosis']: JSON.parse(options.diagnosis),
      ['formData.capacity']: options.capacity,
    })
    // 美团 与 饿了么
    if (type === '美团') {
      getStoreInfo = user.mtStoreDetail(data, storeDetail)
      getBusinessArea = user.mtStoresSearch(Object.assign({}, data))
      Promise.all([getStoreInfo, getBusinessArea, getDiagnosisList]).then(res => {
        // 获取当前店铺信息
        this.getStoreInfo(res[0])
        // 获取商圈店铺
        this.getBusinessArea(res[1])
        // 获取店铺诊断 、商圈容量
        this.getDiagnosisList(res[2].data)
        this.calcWaterMarkNum()
        this.getInfo()
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
          {}, data
        ))
      }).then(res => {
        // 获取商圈店铺
        this.getBusinessArea(res)
        this.calcWaterMarkNum()
        this.getInfo()
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
  onShareAppMessage: function(options){
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    const platformArray = wx.getStorageSync('platformArray')
    const platformIndex = wx.getStorageSync('platformIndex')
    const type = platformArray[platformIndex]
    const storeInfo = this.data.storeInfo
    const searchKeys = wx.getStorageSync('formData');
    const category = wx.getStorageSync('category');
    const formData = this.data.formData
    const pathData = {
      platformIndex: platformIndex,
      address: storeInfo.address,
      latitude: storeInfo.latitude,
      longitude: storeInfo.longitude,
      province: searchKeys.province,
      city: searchKeys.city,
      deliveryMode: storeInfo.deliveryMode,
      deliveryTime: storeInfo.deliveryTime,
      distance: storeInfo.distance,
      logo: storeInfo.logo,
      min_price_tip: storeInfo.min_price_tip,
      monthly_sales: storeInfo.monthly_sales,
      opening_hours: storeInfo.opening_hours,
      rest_id: storeInfo.rest_id,
      rest_name: storeInfo.rest_name,
      score: storeInfo.score,
      shipping_fee_tip: storeInfo.shipping_fee_tip,
      activities: JSON.stringify(storeInfo.activities),
      // 美团与饿了么
      category: type == '美团' ? category : storeInfo.category,
      business: JSON.stringify(formData.business),
      diagnosis: JSON.stringify(formData.diagnosis),
      capacity: formData.capacity,
    }
    let params = ''
    for (const key in pathData) {
      params += key + '=' + pathData[key] + '&'
    }
    console.log(params.slice(0, -1))
    return {
      title: storeInfo.rest_name,
      path: `${pagePath}?` + params.slice(0, -1),
      success: (res) => {},
      fail: (res) => {}
    }
  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){
  }
});
