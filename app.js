// app.js
import {config} from './config.js'
App({
  onLaunch() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    if (logs.length >= 3) {
      logs.splice(2)
    }
    const platformArray = wx.getStorageSync('platformArray')
    if (!platformArray) {
      wx.setStorageSync('platformArray', this.globalData.platArray)
    }
    wx.setStorageSync('logs', logs)
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
    picUrl: config.picUrl,
    platArray: ['美团', '饿了么'],
    copyright: config.copyright
  }
})
