
const promisify = (fn) => {
  // promisify() 返回一个函数
  //这个函数传入的fn（即wx.xxx）
  return async (args) => {
    return new Promise((resolve, reject) => {
      fn({
        ...fn(args || {}),
        success: res => resolve(res),
        fail: err => reject(err)
      })
    })
  }
}
const toAsync = (names) => {
  return (names || [])
    .map(name => (
      {
        name,
        member: wx[name]
      }
    ))
    .filter(t => typeof t.member === "function")
    .reduce((r, t) => {
      r[t.name] = promisify(wx[t.name])
      return r
    }, {})
}

module.exports = {
  toAsync
}
