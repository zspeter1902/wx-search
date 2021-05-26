// # 解构
class HTTP {
  request({ url, data = {}, method = 'GET' }) {
    const _this = this;
    return new Promise((resolve, reject) => {
      _this._request(url, resolve, reject, data, method)
    });
  }
  _request(url, resolve, reject, data = {}, method = 'GET') {
    const header = {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=60' //60秒
    }
    if (method.toLowerCase() === 'post') {
      header["Content-Type"] = 'application/x-www-form-urlencoded'
    }
    wx.request({
      url: url,
      method: method,
      data: data,
      header: header,
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          if (res.data.code == '200') {
            resolve(res.data.result)
          } else {
            reject(res.data.msg)
          }
        } else {
          reject(res.data.msg)
        }
      },
      fail: (err) => {
        reject(err.errMsg)
      }
    })
  }
}

export { HTTP }
