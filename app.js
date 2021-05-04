// app.js
import {config} from './config.js'
import {toAsync} from './utils/async.js'
App({
  onLaunch() {
    // 私有方法
    wx.async = toAsync
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    if (logs.length >= 3) {
      logs.splice(2)
    }
    wx.setStorageSync('logs', logs)
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.switchTab({
        url: '/pages/my/index'
      })
    }
    // 版本更新
    this.update();
  },
  update: function () {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              confirmColor: '#CA6FFF',
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '已经有新版本了哟~',
              confirmColor: '#CA6FFF',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        confirmColor: '#CA6FFF',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  globalData: {
    userInfo: null,
    current: 0,
    picUrl: config.picUrl,
    copyright: config.copyright
  }
})
