import { config } from '../config.js'
import { login } from './login.js'
const Login = new login();
// # 解构
class HTTP {
  request({ url, data = {}, method = 'GET' }) {
    const _this = this;
    return new Promise((resolve, reject) => {
      _this._request(url, resolve, reject, data, method)
    }).catch(reason => {
      wx.hideToast();
      wx.showToast({
        title: '请求异常！',
        icon: 'error',
        duration: 3000,
        mask: false,
      });
    });
  }
  _request(url, resolve, reject, data = {}, method = 'GET') {
    const token = wx.getStorageSync('token');
    const header = {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=60' //60秒
    }
    if (token) header['Authorization'] = token
    const pages = getCurrentPages()
    if (!token && pages[pages.length - 1].route !== 'pages/my/index') {
      wx.showToast({
        icon: 'none',
        title: '您尚未登录！',
        duration: 3000
      })
      return
    }
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: header,
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          if (res.statusCode == 10001) {
            wx.removeStorageSync('userInfo');
            wx.removeStorageSync('token');
            Login.wxLogin(() => {
              this._request(url, resolve, reject, data, method)
            })
          } else {
            reject(res.data.msg)
          }
        }
      },
      fail: (err) => {
        reject(err.errMsg)
      }
    })
  }
}

export { HTTP }
