Component({
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/,
    multipleSlots: true
  },
  properties: {
    list: {
      type: Array,
      value: []
    },
    viewHeight: Number
  },
  data: {
    duration: 300,
    animation: true,
    currentView: 0,
    activeTab: 0
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
    }
  },
  methods: {
    handleTabClick: function handleTabClick(e) {
      var index = e.currentTarget.dataset.index;
      this.triggerEvent('change', index)
      this.setData({ activeTab: index });
    },
    handleSwiperChange: function handleSwiperChange(e) {
      var index = e.detail.current;
      this.triggerEvent('change', index)
      this.setData({ activeTab: index });
    }
  }
});
