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
    typeArray: [
      {'category_name': '快餐便当','category_type': 102761, 'second_category_type': 102762},
      {'category_name': '特色小吃','category_type': 102761, 'second_category_type': 102774},
      {'category_name': '龙虾烧烤','category_type': 102761, 'second_category_type': 102767},
      {'category_name': '米粉面馆','category_type': 102761, 'second_category_type': 102765},
      {'category_name': '地方菜系','category_type': 102761, 'second_category_type': 102764},
      {'category_name': '炸鸡炸串','category_type': 102761, 'second_category_type': 102785},
      {'category_name': '鸭脖卤味','category_type': 102761, 'second_category_type': 102786},
      {'category_name': '包子粥店','category_type': 102761, 'second_category_type': 102779},
      {'category_name': '汉堡薯条','category_type': 102761, 'second_category_type': 102763},
      {'category_name': '火锅串串','category_type': 102761, 'second_category_type': 102781},
      {'category_name': '川湘菜','category_type': 102761, 'second_category_type': 102783},
      {'category_name': '暖胃粉丝汤','category_type': 102761, 'second_category_type': 102789},
      {'category_name': '麻辣烫冒菜','category_type': 102761, 'second_category_type': 102777},
      {'category_name': '夹馍饼类','category_type': 102761, 'second_category_type': 102782},
      {'category_name': '饺子馄饨','category_type': 102761, 'second_category_type': 102784},
      {'category_name': '日料寿司','category_type': 102761, 'second_category_type': 102766},
      {'category_name': '香锅干锅','category_type': 102761, 'second_category_type': 102768},
      {'category_name': '意面披萨','category_type': 102761, 'second_category_type': 102778},
      {'category_name': '韩式料理','category_type': 102761, 'second_category_type': 102780},
      {'category_name': '轻食沙拉','category_type': 102761, 'second_category_type': 102788},
      {'category_name': '面包蛋糕','category_type': 102791, 'second_category_type': 102795},
      {'category_name': '可口甜品','category_type': 102791, 'second_category_type': 102792},
      {'category_name': '奶茶果汁','category_type': 102791, 'second_category_type': 102793},
      {'category_name': '醒脑咖啡','category_type': 102791, 'second_category_type': 102794},
      {'category_name': '凉茶冰淇淋','category_type': 102791, 'second_category_type': 102796},
      {'category_name': '超市卖场','category_type': 102815, 'second_category_type': 102816},
      {'category_name': '便利店','category_type': 102815, 'second_category_type': 102818},
      {'category_name': '日用百货','category_type': 102815, 'second_category_type': 102819},
      {'category_name': '零食干果','category_type': 102815, 'second_category_type': 102817},
      {'category_name': '宠物用品','category_type': 102815, 'second_category_type': 102822},
      {'category_name': '茶酒专卖','category_type': 102815, 'second_category_type': 102821},
      {'category_name': '美妆母婴','category_type': 102815, 'second_category_type': 102820},
      {'category_name': '蔬菜','category_type': 102404, 'second_category_type': 102825},
      {'category_name': '水果','category_type': 102404, 'second_category_type': 102824},
      {'category_name': '冷冻速食','category_type': 102404, 'second_category_type': 102827},
      {'category_name': '海鲜水产','category_type': 102404, 'second_category_type': 102828},
      {'category_name': '常用药品','category_type': 102829, 'second_category_type': 102830},
      {'category_name': '成人用品','category_type': 102829, 'second_category_type': 102832},
      {'category_name': '保健用品','category_type': 102829, 'second_category_type': 102833},
      {'category_name': '浪漫鲜花','category_type': 102834, 'second_category_type': 102839},
      {'category_name': '多肉绿植','category_type': 102834, 'second_category_type': 102840}
    ],
    typeIndex: null,
    lists: [],
    globalData: wx.getStorageSync('formData'),
    platformArray: wx.getStorageSync('platformArray'),
    platformIndex: wx.getStorageSync('platformIndex'),
    formData: {},
    rules: [{
      name: 'name',
      rules: [{required: true, message: '请选择店铺'}]
    }],
    loading: false,
    lock: false,
    _cacheData: {}
  },
  //options(Object)
  onLoad: function(options){
    // 获取信息
    //获取事件对象
    this._openLoading()
    wx.removeStorageSync('category');
    this.data.eventChannel = this.getOpenerEventChannel()
    //获取订单列表页面传来的数据
    this.data.eventChannel.on('searchData', (res) => {
      // 处理并返回数据
      this.setData({
        lists: res.data
      })
      this._closeLoading()
    })
  },
  updateList(typeIndex) {
    const type = this.data.platformArray[this.data.platformIndex]
    const category = this.data.typeArray[typeIndex].category_name
    const data = Object.assign({}, this.data.globalData, {category})
    this._openLoading()
    const func = {
      '美团': () => {
        if (this.data._cacheData[category]) {
          this.setData({
            lists: this.data._cacheData[category]
          })
          this._closeLoading()
          return
        }
        user.mtStoresSearch(data).then(res => {
          this.setData({
            lists: res,
            [`_cacheData.${category}`]: res
          })
          this._closeLoading()
        })
      },
      '饿了么': () => {
        if (this.data._cacheData[category]) {
          this.setData({
            lists: this.data._cacheData[category]
          })
          this._closeLoading()
          return
        }
        user.elemeStoresSearch(data).then(res => {
          this.setData({
            lists: res
          })
          this._closeLoading()
        })
      },
    }
    func[type]()
  },
  radioChange(e) {
    const item = this.data.lists[e.detail.value]
    this.setData({
      ['formData.name']: item.rest_name,
      ['formData.longitude']: item.longitude,
      ['formData.latitude']: item.latitude,
      ['formData.address']: item.address,
      ['formData.category']: item.category
    })
    wx.setStorageSync('storeDetail', JSON.stringify(item));
  },
  bindPickerChange(e) {
    this.setData({
      typeIndex: e.detail.value
    })
    this.updateList(e.detail.value)
  },
  formSubmit(e) {
    const type = this.data.platformArray[this.data.platformIndex]
    this.selectComponent('#form').validate((valid, errors) => {
      if (type === '美团') {
        if (!this.data.typeIndex && this.data.typeIndex !== 0) {
          wx.showToast({
            icon: 'error',
            title: '请选择品类'
          })
          return
        }
        const category = this.data.typeArray[this.data.typeIndex].category_name
        wx.setStorageSync('category', category);
      }
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
    const globalData = this.data.globalData
    const formData = JSON.parse(JSON.stringify(this.data.formData))
    const type = this.data.platformArray[this.data.platformIndex]
    if (this.isLock()) {
      return
    }
    this._openLoading()
    this.locked()
    for (let item in formData) {
      if (!formData[item]) {
        if (type == '饿了么') {
          delete formData['category']
        }
        delete formData[item]
      }
    }
    const data = Object.assign({}, globalData, formData)
    wx.setStorage({
      key: 'formData',
      data: data,
      success: () => {
        this._closeLoading()
        this.unLocked()
        wx.navigateTo({
          url: '/pages/result/index'
        });
      }
    });
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
    this.setData({
      globalData: wx.getStorageSync('formData'),
      platformIndex: wx.getStorageSync('platformIndex')
    })
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
