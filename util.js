/**
 * @author OlivierHu
 * @date 2019/03/13
 * @desc the utils for js
 */

Class Util {
  /**
   * 根据key获取对应的cookie
   * @params { string } key
   * @return { string }
   */
  getCookie(key) {
    const reg = new RegExp(key + '=(.+?)(?:;|$)')
    const match = document.cookie.match(reg)
    return (match && match[1]) || ''
  },

  /**
   * 获取所有参数
   * @params { string } url
   * @return { Object }
   */
  getParams(url = location.href) {
    const result = {}
    const decodeUrl = decodeURIComponent(url)
    const urlArr = decodeUrl.split('&')
    urlArr.forEach(item => {
      const match = item.match(/([\w-]+)=(.*?)(?:&|\?|$)/)
      if(match) {
        result[match[1]] = match[2]
      }
    })
    return result
  },

  /**
   * 获取指定key值的参数
   * @params { string } key
   * @params { string } type
   * @params { string } src
   * @return { string/number }
   */
  getParam(key, type = 'string', src = location.search) {
    const reg = new RegExp('(?:^|\\?|&)' + key + '=(.*?)(?:&|\\?|$)')
    const match = decodeURIComponent(src).match(reg)
    if (match) {
      return type === 'number' ? match[1] - 0 : match[1]
    }
    return type === 'number' ? 0 : ''
  },

  /**
   * 根据经纬度算出距离
   * @params { number } lat1
   * @params { number } lng1
   * @params { number } lat2
   * @params { number } lng2
   * @return { string }
   */
  getDistance(lat1, lng1, lat2, lng2) {
    const radLat1 = lat1 * Math.PI / 180
    const radLat2 = lat2 * Math.PI / 180
    const a = radLat1 - radLat2
    const b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * 6378.137
    s = Math.round(s * 10000) / 10000
    return s.toFixed(2)
  },

  /**
   * 对比两个对象的值是否都相同
   * @params { Object } obj1
   * @params { Object } obj2
   * @return { Boolean }
   */
  objectEqual(obj1, obj2) {
    if (!obj1 || !obj2) {
      return false
    }
    const arr1 = Object.keys(obj1)
    const arr2 = Object.keys(obj2)
    if (arr1.length !== arr2.length) {
      return false
    }
    return arr1.every((key) => {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        return this.objectEqual(obj1[key], obj2[key])
      }
      if (obj1[key] === obj2[key]) {
        return true
      }
      return false
    })
  },

  /**
   * 将obj转为query
   * @params { Object } obj
   * @params { Object } pre
   * @return { string }
   */
  query2Str(obj, pre = '') {
    let strArr = []
    for (let i in obj) {
      strArr.push(`${pre}${i}=` + encodeURIComponent(obj[i]))
    }
    return strArr.length > 0 ? '?' + strArr.join('&') : ''
  },

  /**
   * 对象和数组的深拷贝
   * @params { Object/Array } obj
   * @return { Object/Array }
   */
  deepCopy(obj) {
    if(!obj || typeof obj !== 'object') return obj
    let result = obj instanceof Object ? {} : []
    for(let key in obj) {
      if(obj.hasOwnProperty(key)){
        result[key] = this.deepCopy(obj[key])
      }else{
        result[key] = obj[key]
      }
    }
    return result
  },

  /**
   * 手机号码中间四位变*
   * @params { String } phone
   * @return { String }
   */
  translatePhone(phone) {
    if(!phone || typeof phone !== 'string') return phone
    const reg = /^(\d{3})\d*(\d{4})$/
    return phone.replace(reg,'$1****$2')
  },
  
  /**
   * 手机号码加空格
   * @params { String } phone
   * @return { String }
   */
  addPhoneSpace(phone) {
    if(!phone || typeof phone !== 'string') return phone
    const reg = /^(.{3})(.{4})(.{4})$/g
    return phone.replace(reg, '$1 $2 $3')
  },

  /**
   * 检查手机号码
   * @params { String } phone
   * @return { String }
   */
  checkPhone(phone) {
    if(!phone || typeof phone !== 'string') return phone
    const reg = /^1[345789]\d{9}$/
    return reg.test(phone) ? true : false
  },

  /**
   * 千分位
   * @params { Number } value
   * @return { String }
   */
  thousandSeparator(value) {
    if(isNaN(value - 0)) return value
    if((value - 0) === 0) return '0'
    value = value - 0
    return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }
};

export default Util