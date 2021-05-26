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
    time: '',
    time2: ''
  },
  /**
   * 组件的生命周期
   */
   lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindTimeChange(e) {
      const time = e.detail.value
      this.setData({
        time: time
      })
      this.triggerChange()
    },
    bindTimeChange2(e) {
      const time = e.detail.value
      this.setData({
        time2: time
      })
      this.triggerChange()
    },
    triggerChange() {
      const start = this.data.time
      const end = this.data.time2
      if (!!start && !!end) {
        this.triggerEvent('change', {
          start, end
        })
      }
    }
  }
})
