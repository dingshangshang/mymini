// index.js
// 获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
var commonjs = require('../../utils/common.js')
Page(Object.assign({
  data: {
    users: [{
      id: 1,
      age: 20
    }, {
      id: 2,
      age: 28
    }],
    department: [{
      number: 8,
      users: [{
        id: 1,
        age: 9
      }, {
        id: 2,
        age: 10
      }]
    }, {
      number: 11,
      users: [{
        id: 1,
        age: 12
      }, {
        id: 2,
        age: 13
      }]
    }]
  },
  onLoad() {
    var that = this;
    that.init();
  },
  init() { //喜欢把页面需要加载的东西都放在这里，如果有刷新方法的话，可直接调用

  },
  numberChangeBind1: function (e) { //监听数字切换事件，并进行同步
    var that = this;
    var val = e.detail.value;
    that.setData({
      number: val
    });
  },
  numberChangeBind2: function (e) { //监听数字切换事件，并进行同步
    var that = this;
    var indexNow = e.detail.index;
    var val = e.detail.value;
    var users=that.data.users;
    users[indexNow].age=val;
    that.setData({
      users: users
    });
  },
  numberChangeBind3: function (e) { //监听数字切换事件，并进行同步
    var that = this;
    var indexNow = e.detail.index;
    var val = e.detail.value;
    var indexList = indexNow.split(',');
    var index = Number(indexList[0]);
    var userIndex = Number(indexList[1]);
    var department = that.data.department;
    department[index].users[userIndex].age = val;
    that.setData({
      department: department
    });
  },
}, commonjs))