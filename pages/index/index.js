//index.js
//获取应用实例
import {userModel} from '../../models/user.js';
const user = new userModel()
//Page Object
Page({
  data: {
    platformArray: wx.getStorageSync('platformArray'),
    platformIndex: wx.getStorageSync('platformIndex') || null,
    formData: {
      code: wx.getStorageSync('code')
    },
    rules: [{
      name: 'address',
      rules: [{required: true, message: '请输入商铺地址'}]
    },{
      name: 'name',
      rules: [{required: true, message: '请输入店铺名称'}]
    }, {
      name: 'province',
      rules: [{required: true, message: '请选择省份'}]
    }, {
      name: 'city',
      rules: [{required: true, message: '请选择城市'}]
    }, {
      name: 'code',
      rules: [{required: true, message: '请输入邀请码'}]
    }],
    loading: false,
    lock: false
  },
  //options(Object)
  onLoad: function(options){
    // 获取信息
  },
  openMap(e) {
    let that = this;
    //选择位置，需要用户授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.showToast({ //这里提示失败原因
                title: '授权成功！',
                duration: 1500
              })
            },
            fail() {
              that.showSettingToast('需要授权位置信息');
            }
          })
        } else {
          wx.chooseLocation({
            success: (res) => {
              const address = res.address
              const reg = /.+?(省|市|盟|自治区)/g
              if (address) {
                const arr = address.match(reg)
                const province = arr[0].replace(/['省', '市', '自治区']/g, '')
                const city = arr[1].replace('市', '')
                that.setData({
                  [`formData.address`]: res.address,
                  [`formData.latitude`]: res.latitude.toFixed(6),
                  [`formData.longitude`]: res.longitude.toFixed(6),
                  ['formData.province']: province,
                  ['formData.city']: city
                })
              }
            }
          })
        }
      }
    })
  },
  showSettingToast: function(e) {
    wx.showModal({
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/setting/index',
          })
        }
      }
    })
  },
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
  },
  bindPickerChange(e) {
    this.setData({
      platformIndex: e.detail.value
    })
  },
  formSubmit(e) {
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          wx.showToast({
            icon: 'error',
            title: errors[firstError[0]].message
          })
        }
      } else {
        this.onHttpSubmit()
      }
    })
  },
  onHttpSubmit() {
    const data = this.data.formData
    const type = this.data.platformArray[this.data.platformIndex]
    const _fun = {
      '美团': () => {
        user.mtStoreSearch(data).then(result => {
          this._closeLoading()
          wx.navigateTo({
            url: '/pages/select/index',
            success: (res) => {
              /**
               * 店铺列表
               */
              res.eventChannel.emit('searchData', {
                 data: result
              })
            },
          })
          this.unLocked()
        }).catch(err => {
          wx.showToast({
            title: err,
            icon: 'error'
          });
        })
      },
      '饿了么': () => {
        user.elemeStoreSearch(data).then(result => {
          this._closeLoading()
          wx.navigateTo({
            url: '/pages/select/index',
            success: (res) => {
              /**
               * 店铺列表
               */
              res.eventChannel.emit('searchData', {
                 data: result
              })
            },
          })
          this.unLocked()
        }).catch(err => {
          wx.showToast({
            title: err,
            icon: 'error'
          });
        })
      }
    }
    if (!this.isLock()) {
      this.locked()
      this._openLoading()
      user.verificationCode(data.code).then(res => {
        const cacheData = JSON.parse(JSON.stringify(data))
        delete cacheData.code
        wx.setStorageSync('formData', cacheData);
        wx.setStorageSync('platformIndex', this.data.platformIndex);
        wx.setStorageSync('code', data.code)
        _fun[type]()
      }).catch(err => {
        wx.showToast({
          title: err,
          icon: 'error'
        });
      })
    }
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
  unLocked() {
    this.data.lock = false
  },
  locked() {
    this.data.lock = true
  },
  isLock() {
    return this.data.lock
  },
  onReady: function() {
  },
  onShow: function() {
    // this.setData({
    //   platformIndex: wx.getStorageSync('platformIndex')
    // })
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
