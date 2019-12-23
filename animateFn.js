// 缓动函数
class AnimateFn {
  constructor(params) {
    this.el = params.el
    this.attr = params.attr
    this.target = params.target
    this.time = params.time || 0.5
    this.current = this.el[this.attr]
    this.step = 1
    if (!this.el || !this.attr || (!this.target && this.target !== 0)) {
      throw new Error('请确认参数')
    } else {
      this.init()
    }
  }
  init() {
    this.initRequestAnimFrame()

    // 初始化step
    const allTime = this.time * 60 // requestAnimationFrame每s执行60次, 以此来计算执行次数
    const distance = Math.abs(this.current - this.target)
    const temp = parseInt(distance / allTime)
    this.step = temp > 1 ? temp : 1

    this.animating()
  }
  // 兼容requestAnimationFrame
  initRequestAnimFrame() {
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ) {
                window.setTimeout(callback, 1000 / 60)
              }
    })()
  }
  // 缓动
  animating() {
    if (this.current === this.target) return
    if (this.current > this.target) {
      this.current -= this.step
    } else {
      this.current += this.step
    }
    this.el[this.attr] = this.current
    if (Math.abs(this.current - this.target) <= this.step) {
      this.current = this.target
      this.el[this.attr] = this.current
    } else {
      requestAnimFrame(this.animating.bind(this))
    }
  }
}

export default AnimateFn