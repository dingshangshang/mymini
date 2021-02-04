// 获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
var commonjs = require('../../utils/common.js')
Page(Object.assign({
  data: {
    age:[
      {},
      {}
    ],
  },
  onLoad() {
    var that = this;
    that.init();
  },
  init() { //喜欢把页面需要加载的东西都放在这里，如果有刷新方法的话，可直接调用

  },
  // pick相关start
  _sure(e) {
    var that = this;
    let data = e.detail
    var index = that.data.index;
    var type = that.data.type;
    this.setData({
      openPicker: false,
    })
    if (data != null && data.length > 0) {
      var list = that.data.list;
      switch (type) {
        case "1":
          that.setData({
            sex: data[0].id,
            sex_show: data[0].name
          });
          break;
          case "2":
            var age=that.data.age;
            age[index].age=data[0].id;
            age[index].age_name=data[0].name;
            that.setData({
              age: age,
            });
            break;
      }
    }
  },
  _close(e) {
    console.log(e.detail)
    this.setData({
      openPicker: false
    })
    console.log('点击了取消')
  },
  _openPick(e) {
    var that=this;
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    var value = e.currentTarget.dataset.value;
    that.setData({
      type: type,
      index: index
    });
    //请求下拉框数据
    switch (type) {
      case "1":
        that.selectComponent('#picker').init([
          [{
            id: '',
            name: '请选择性别'
          }, {
            id: 1,
            name: '男'
          }, {
            id: 2,
            name: '女'
          }],
        ],value);
        break;
        case "2":
          that.selectComponent('#picker').init(
           [
             [{
              id: '',
              name: '请选择年龄'
            }, {
              id: 1,
              name: '20'
            }, {
              id: 2,
              name: '30'
            }]
          ],value);
          break;
    }
    this.setData({
      openPicker: true
    })
  },
  // pick相关end
}, commonjs))