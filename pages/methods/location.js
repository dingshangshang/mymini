// 获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
var commonjs = require('../../utils/common.js')
Page(Object.assign({
  data: {
    address:'选择地址'
  },
  onLoad() {
    var that=this;
    that.init();
  },
  init(){ //喜欢把页面需要加载的东西都放在这里，如果有刷新方法的话，可直接调用

  },
  getAddress:function(){
    var that=this;
    that.getCurrentLocal("address").then(a => {
      console.log("定位完成了，下面打印返回的参数");
      console.log(a);
      that.setData({a:a,address:a.name});
    });
  }
}, commonjs))
