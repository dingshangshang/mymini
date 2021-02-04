// 获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
var commonjs = require('../../utils/common.js')
Page(Object.assign({
  data: {

  },
  onLoad() {
    var that=this;
    that.init();
  },
  init(){ //喜欢把页面需要加载的东西都放在这里，如果有刷新方法的话，可直接调用

  },
  click1:function(){
    util.showSuccessMsg("成功");
  },
  click2:function(){
    util.showFailMsg("操作失败");
  },
  click3:function(){
    util.showConfirm("确定删除？",function(){
      util.showSuccessMsg("点击了确定");
    },function(){
      util.showSuccessMsg("点击了取消");
    });
  },
  click4:function(){

  },
}, commonjs))
