// 获取设备
const _ua = window.navigator.userAgent;
const android = _ua.match(/(Android);?[\s/]+([\d.]+)?/);
const iphone = _ua.match(/(iPhone\sOS)\s([\d_]+)/);
const winphone = _ua.match(/globals Phone ([\d.]+)/);
const ipad = _ua.match(/(iPad).*OS\s([\d_]+)/);
const weixin = _ua.toLowerCase().includes('micromessenger');
const device = android ? 'android' : iphone ? 'iphone' : winphone ? 'winphone' : ipad ? 'ipad' : '';

let iphoneX = false;
try {
  if(_ua.indexOf('iPhoneX') !== -1)  {
    iphoneX = true;
  }
  iphoneX = window.screen.height === 812 || window.screen.width === 812;
} catch (e) {
  iphoneX = false;
}

export default {
  android,
  iphone,
  winphone,
  ipad,
  weixin,
  deviceType: device,
  iphoneX: iphoneX
};