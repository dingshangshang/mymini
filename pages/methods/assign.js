// 获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
var commonjs = require('../../utils/common.js')
Page(Object.assign({
  data: {
    //就算不定义也可以赋值传值，部分情况出来，请注意文字描述
    a:{}
  },
  onLoad() {
    var that=this;
    that.init();
  },
  init(){ //喜欢把页面需要加载的东西都放在这里，如果有刷新方法的话，可直接调用

  },
  btn1:function(e){
    var that=this;
    that.setData({val:1});
  },
  btn2:function(e){
    var that=this;
    that.setData({["val"]:2});
  },
  btn3:function(){
    var that=this;
    var a=that.data.a;
    a.val=1;//此种赋值，a这个对象必须在data中，否则会报错
    that.setData({a:a});
  },
  btn4:function(){
    var that=this;
    that.setData({["a.val"]:2});//中括号加引号的写法需要对象在data中存在
  },
  btn5:function(){
    
  },
  btn6:function(){
    
  },
}, commonjs))
