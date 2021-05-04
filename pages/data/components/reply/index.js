// pages/data/components/base/index.js
import {userModel} from '../../../../models/user.js';
const user = new userModel()
Component({
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/, // 指定所有 _ 开头的数据字段为纯数据字段
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: () => {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    switch: false,
    lists: {
      auto: '已自动回复2条评价',
      text: '有一条差评待人工回复'
    },
    lists2: {
      auto: '已自动回复2条评价',
      text: '有一条差评待人工回复'
    },
    dialogShow: false,
    isTip: false,
    formData: {
      content: null
    },
    rules: [{
      name: 'content',
      rules: [{required: true, message: '请输入内容'}]
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getInfo() {
      user.getShopReply(shopId).then(res => {

      })
    },
    setReply() {
      user.setShopReply(shopId, num, reply).then(res => {

      })
    },
    onSwitch(e) {
      const msg = e.detail ? '打开' : '关闭'
      wx.showModal({
        title: `您确定${msg}自动回评功能吗？`,
        content: '',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#CA6FFF',
        success: (result) => {
          if(result.confirm){
            this.setAutoReply(e.detail)
          } else {
            this.setData({
              switch: !e.detail
            })
          }
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    },
    setAutoReply(status) {
      const shopId = wx.getStorageSync('shopId')
      user.bindShopReview(shopId, +status).then(res => {
        this.setData({
          switch: status
        })
        wx.showToast({
          title: '',
          icon: 'success'
        })
      }).catch(err => {
        this.setData({
          switch: !status
        })
        wx.showToast({
          title: '',
          icon: 'error'
        })
      })
    },
    openReply() {
      this.setData({
        dialogShow: true
      })
    },
    onClose() {
      this.setData({
        dialogShow: false
      })
    },
    formInputChange(e) {
      const {field} = e.currentTarget.dataset
      this.setData({
          [`formData.${field}`]: e.detail.value
      })
    },
    onAdd() {

    },
    formSubmit(e) {
      const form = e.currentTarget.dataset.form
      this.selectComponent('#' + form).validate((valid, errors) => {
        console.log('valid', valid, errors)
        if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
            wx.showToast({
              icon: 'error',
              title: errors[firstError[0]].message
            })
          }
        } else {
          this.setData({
            dialogShow: false
          })
        }
      })
    }
  }
})
