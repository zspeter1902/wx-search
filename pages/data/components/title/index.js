// pages/data/components/base/index.js
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
    title: String,
    button: Boolean,
    switch: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    checked: false
  },
  observers: {
    'switch': function(newVal) {
      if (this.data.checked !== newVal) {
        this.setData({
          checked: newVal
        })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onSwitch() {
      this.setData({
        checked: !this.data.checked
      })
      this.triggerEvent('switch', this.data.checked)
    }
  }
})
