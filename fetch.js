class Fetch {
  static fetch(url, opts, other) {
    const instance = new Fetch(url, opts, other)
    return instance.preFetch()
  }
  constructor(url, opts, other) {
    if(opts.method && opts.method.toLowerCase() === 'post') {
      opts.body = JSON.stringify(opts.body)
    }

    this.url = url
    this.opts = opts  // 此处可以统一处理请求头
    this.other = other

    this.timeout = false
    this.timeoutId = null

    this.init()
  }
  init() {
    this.other = Object.assign({
      query: {},
      timeout: 30
    }, this.other)
    this.setQuery()
  }
  setQuery() {
    const { query } = this.other
    let str = ''
    for (let key in query) {
      str += `${key}=${query[key]}&`
    }
    if (str.length > 0) {
      this.url += (this.url.indexOf('?') > 0 ? '&' : '?') + str
    }
  }
  preFetch() {
    const {timeout} = this.other
    const timePromise = new Promise((resolve, reject) => {
      this.timeoutId = setTimeout(() => {
        reject({
          url: this.url,
          code: -2,
          message: '网路超时'
        })
      }, timeout * 1000)
    })
    return Promise.race([timePromise, this._fetch()])
  }
  async _fetch() {
    const url = this.url
    const opts = this.opts
    const other = this.other

    return fetch(url, opts).then(res => {
      if(res.ok) {
        console.log('接口获取成功')
        return res.json().then(data => {
          if(data.Code !== undefined) {
            data.Code -= 0
            return data
          }
        }).catch(e => {
          return Promise.reject({
            url: this.url,
            code: -1,
            message: e.message
          })
        })
      }
      return Promise({
        url: this.url,
        code: -3,
        message: '接口异常，状态码:' + res.status
      })
    })
  }
}

export default Fetch