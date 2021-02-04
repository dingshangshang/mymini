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
    var that = this;
    let objModal = {
      show: true,
      title: '新增',
      height: '250rpx',
      showCancel: true
    }
    this.selectComponent('#modal').init(objModal);
  },
  modalOperate:function(res){ //模态框点击确定或者取消
    var that = this;
    let myComponent = this.selectComponent('#modal'); // 页面获取自定义组件实例
    if (res.detail.res == 'confirm') { //点击了确定
      util.showSuccessMsg("姓名"+that.data.name);
      myComponent.modalShowChange(); //关闭弹窗
    }
  }
}, commonjs))
