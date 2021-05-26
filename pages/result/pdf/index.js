import Store from '../../../palette/store';
Page({
  data: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    capacityEntries: {
      '五星': 5,
      '三星': 3,
      '一星': 1
    },
    // 顶部条
    isBar: false,
    storeInfo: {},
    checkboxItems: [],
    diagnosisList: [],
    capacityList: [],
    formData: {},
    src: '',
    paintPallette: null,
    isAuthorize: false,
    watermarkNum: 1,
    isSave: false
  },
  //options(Object)
  onLoad: function(options){
    // 获取信息
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
    setTimeout(() => {
      wx.hideLoading();
      this.data.src = e.detail.path;
      if (this.data.isSave) {
        this.data.isSave = false
        this.onSave()
      }
      console.log(this.data.src)
    }, 1500)
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
  onShareAppMessage: function(){
  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){
  }
});
