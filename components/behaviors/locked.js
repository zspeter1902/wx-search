const lockedBev = Behavior({
  data: {
    isLock: false
  },
  methods: {
    _isLocked() {
      return this.data.isLock ? true : false
    },
    _locked() {
      this.setData({
        isLock: true
      })
    },
    _unLocked() {
      this.setData({
        isLock: false
      })
    },
  }
})

export {
  lockedBev
}