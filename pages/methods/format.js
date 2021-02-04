// 获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
var commonjs = require('../../utils/common.js')
Page(Object.assign({
  data: {
    dt:'2020-1-2 14:20:12',
    price:123.4567,
  },
  onLoad() {
    var that=this;
    that.init();
  },
  init(){ //喜欢把页面需要加载的东西都放在这里，如果有刷新方法的话，可直接调用

  },
}, commonjs))
