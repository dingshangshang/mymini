// index.js
// 获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
var commonjs = require('../../utils/common.js')
Page(Object.assign({
  data: {
    pageSize: 10,
    pageIndex: 1,
    canLoad:true
  },
  onLoad() {
    var that = this;
    that.init();
  },
  init() { //喜欢把页面需要加载的东西都放在这里，如果有刷新方法的话，可直接调用
    var that = this;
    that.setData({ //刷新的时候需要重新获取第一页的数据
      pageIndex: 1
    });
    that.getList();
  },
  getList: function () {
    var that = this;
    var data = {
      pageSize: that.data.pageSize,
      pageIndex: that.data.pageIndex
    };
    console.log("再来");
    app.apiHelper("api/order/list", data).then(function (res) {
      if (res.IsSuccess) {
        var resdata=res.data;
        console.log(res);
        if (data.pageIndex == 1) { //如果是获取第一页数据
          that.setData({
            list: resdata,
          });
        } else { //获取其它页的数据时，将数据拼接到后面
          var list = that.data.list;
          list = list ? list : [];
          list = list.concat(resdata);
          that.setData({
            list: list,
          });
        }

        if (resdata == null || resdata.length < 1) {
          console.log(1);
          //如果没有更多的数据了
          that.setData({
            canLoad: false,
          });
          //关闭组件中的上拉加载
          that.selectComponent("#layout").setHaveLoadMore(data.pageIndex != 1); // 页面获取自定义组件实例
          that.selectComponent("#layout").setLoadMore(false); // 页面获取自定义组件实例
        } else {
          console.log(2);
          //打开组件中的上拉加载
          that.selectComponent("#layout").setHaveLoadMore(true); // 页面获取自定义组件实例
          console.log(resdata.length);
          that.selectComponent("#layout").setLoadMore(resdata.length >= data.pageSize); // 如果数据不足一页，则不需要再加载
        }
      } else {
        util.showFailMsg(res.Content);
      }
    });
  },
  loadmore: function () {
    //上拉加载
    console.log("正在上拉加载");
    var that = this;
    if (!that.data.canLoad) {
      //如果没有更多数据，则不触发下拉刷新
      //关闭组件中的上拉加载
      that.selectComponent("#layout").setLoadMore(false); // 页面获取自定义组件实例
      return false;
    }

    that.setData({ showload: true });
    setTimeout(function () {//一定时间内触发次数过多不会执行该事件
      that.setData({  showload: false });
      var pageIndex = that.data.pageIndex;
      pageIndex+=1;
      that.setData({
        pageIndex: pageIndex,
      });
      that.getList();
    }, 500);
  },
}, commonjs))