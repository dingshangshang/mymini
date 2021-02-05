// 获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
var commonjs = require('../../utils/common.js')
var starttime=new Date();
Page(Object.assign({
  data: {
    starttime:starttime
  },
  onLoad() {
    var that = this;
    var dt1=util.getCurrentDate();
    var dt2=util.getCurrentDate();
    //前台模拟数据
    that.setData({
      list:[{id:1,CreationTime:dt1,timer:'00:00'}, {id:2,CreationTime:dt2,timer:'00:00'}],
    });
    that.init();
  },
  init() { //喜欢把页面需要加载的东西都放在这里，如果有刷新方法的话，可直接调用
    var that = this;
    //定时器处理
    var t = setInterval(function () {
      //计时
      var data = that.data.list;
      if (data != null && data.length > 0) {
        data.forEach((a) => {
            a.timer = that.refreshDataTimer(a.CreationTime);//计时
        });
        that.setData({
          list: data,
        });
      }

      //倒计时
      var data2 = that.data.list2;
      if (data2 != null && data2.length > 0) {
        data2.forEach((a) => {
            a.timer = that.refreshDataTimerInverse(a.timer);//计时
        });
        that.setData({
          list2: data2,
        });
      }
    }, 1000);
    that.setData({
      t: t,
    });
  },
  refreshDataTimer(startTimePara) {//计时函数
    //刷新计时器,每秒刷新一次
    var start_time = startTimePara;
    start_time = new Date(start_time);
    start_time.setMinutes(start_time.getMinutes() + 0); //60
    var start_time = Math.floor(start_time.getTime() / 1000); // 创建时间戳
    var newtime = Math.floor(new Date().getTime() / 1000); // 当前时间戳
    var minutes = Math.floor((newtime - start_time) / 60); // 分钟数
    var seconds = (newtime - start_time) % 60; // 秒数
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    } 
     var timer = minutes + ":" + seconds;
    return timer;
  },
  onUnload() { //关闭页面时清除定时器
    clearInterval(this.data.t);
    clearInterval(this.data.t2);
  },
}, commonjs))