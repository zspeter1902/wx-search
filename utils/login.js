import { config } from "../config.js"
class login {
  checkLogin(callback) {
    const that = this
    const token = wx.getStorageSync('token');
    const pages = getCurrentPages()
    if (token) {
      callback && callback()
    } else {
      // 登录
      wx.showModal({
        title: '提示',
        content: '此操作需要您先登录！',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#333333',
        confirmText: '确定',
        confirmColor: '#CA6FFF',
        success: (result) => {
          if (result.confirm) {
            wx.removeStorageSync('userInfo');
            wx.setStorageSync('coupon', true);
            wx.removeStorageSync('token');
            if (pages[pages.length - 1].route == 'pages/my/index') {
              that.wxLogin()
            } else {
              wx.switchTab({
                url: '/pages/my/index'
              });
            }
          }
        },
      });
    }
  }

  async wxLogin(callback) {
    const wxa = wx.async(['login', 'getUserInfo'])
    try {
      const res1 = await wxa.login()
      const res2 = await wxa.getUserInfo()
      wx.request({
        url: config.api_base_url + 'login/wxLogin',
        method: 'GET',
        data: {
          code: res1.code,
          iv: res2.iv,
          encryptedData: res2.encryptedData
        },
        success: (res) => {
          console.log(res)
          const result = res.data.result
          if (res.statusCode == 200) {
            wx.removeStorageSync('token');
            wx.removeStorageSync('openId');
            if (result.token) {
              wx.setStorageSync('token', result.token);
            }
            wx.setStorageSync('openId', result.openid);
            // 获取用户信息
            wx.setStorageSync('userInfo', result);
            if (callback) {
              callback()
              return
            }
            if (getCurrentPages().length != 0) {
              getCurrentPages()[getCurrentPages().length - 1].onLoad()
            }
          }
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export { login }