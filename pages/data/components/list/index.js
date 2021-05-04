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
    lists: [
      {
        text: '>1、-17号单-出餐成功'
      },
      {
        text: '>1、-17号单-出餐成功'
      },
      {
        text: '>1、-17号单-出餐成功'
      },
      {
        text: '>1、-17号单-出餐成功'
      },
      {
        text: '>1、-17号单-出餐成功'
      },
      {
        text: '>1、-17号单-出餐成功'
      },
      {
        text: '>1、-17号单-出餐成功'
      }
    ],
    lists2: [
      {
        text: '>1、-17号单-出餐成功'
      },
      {
        text: '>1、-17号单-出餐成功'
      },
      {
        text: '>1、-17号单-出餐成功'
      },
      {
        text: '>1、-17号单-出餐成功'
      },
      {
        text: '>1、-17号单-出餐成功'
      },
      {
        text: '>1、-17号单-出餐成功'
      },
      {
        text: '>1、-17号单-出餐成功'
      }
    ],
    dialogShow: false,
    formData: {
      time: null
    },
    rules: [{
      name: 'time',
      rules: [{required: true, message: '请输入时间'}, {range: [5, 20], message: '值在5-20之间'}],
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getInfo() {
      user.getShopReview(shopId).then(res => {

      })
    },
    onSwitch(e) {
      const msg = e.detail ? '打开' : '关闭'
      wx.showModal({
        title: `您确定${msg}自动出单功能吗？`,
        content: '',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#CA6FFF',
        success: (result) => {
          if(result.confirm){
            this.setAutoList(e.detail)
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
    setAutoList(status) {
      const shopId = wx.getStorageSync('shopId')
      user.setShopTime(shopId, this.data.formData.time, +status).then(res => {
        this.setData({
          switch: status
        })
        wx.showToast({
          title: '',
          icon: 'success'
        })
      }).catch((err) => {
        this.setData({
          switch: !status
        })
        wx.showToast({
          title: '',
          icon: 'error'
        })
      })
    },
    openTime() {
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
    formSubmit() {
      this.selectComponent('#form').validate((valid, errors) => {
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
