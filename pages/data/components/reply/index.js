// pages/data/components/base/index.js
import {userModel} from '../../../../models/user.js';
const user = new userModel()
import {login} from '../../../../utils/login.js';
const Login = new login();
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
    shopName: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    switch: false,
    lists: {},
    lists2: {},
    dialogShow: false,
    isTip: false,
    formData: [],
    rules: [{
      name: 'reply',
      rules: [{required: true, message: '请输入内容'}]
    }]
  },
  observers: {
    'shopName': function(newVal) {
      if (newVal) {
        this.getInfo()
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getInfo() {
      Login.checkLogin(() => {
        user.getShopReply(this.data.shopName).then(res => {
          this.setData({
            formData: res.data,
            switch: !!Number(res.status)
          })
        })
        user.getReplyStatistics().then(res => {
          this.setData({
            lists: res.mt,
            lists2: res.eleme
          })
        })
      })
    },
    setReply(shopName, num, reply) {
      Login.checkLogin(() => {
        user.setShopReply(shopName, num, reply).then(res => {
          wx.showToast({
            title: '保存成功！',
            icon: 'success',
            duration: 1500,
            mask: true
          });
        })
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
      Login.checkLogin(() => {
        user.bindShopReview(this.data.shopName, +status).then(res => {
          this.setData({
            switch: status
          })
          wx.showToast({
            title: '设置成功！',
            icon: 'success'
          })
        }).catch(err => {
          this.setData({
            switch: !status
          })
          wx.showToast({
            title: '设置失败！',
            icon: 'error'
          })
        })
      })
    },
    openReply() {
      this.getInfo()
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
      const {field, index} = e.currentTarget.dataset
      this.setData({
          [`formData[${index}].${field}`]: e.detail.value
      })
    },
    onAdd() {
      const len = this.data.formData.length
      if (len < 10) {
        this.setData({
          [`formData[${len}]`]: {}
        })
      }
    },
    formSubmit(e) {
      const {form, index} = e.currentTarget.dataset
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
          const currentData = this.data.formData[index]
          this.setReply(this.data.shopName, currentData.num, currentData.reply)
          this.setData({
            dialogShow: false
          })
        }
      })
    }
  }
})
