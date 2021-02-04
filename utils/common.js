module.exports = {
  setdata(e) {
    let name = e.currentTarget.dataset.name;
    let val = e.currentTarget.dataset.value;
    if (val == null) {
      val = e.detail.value;
    }
    let nameMap = {}
    if (name.indexOf('.') > -1) {
      let nameList = name.split('.')
      if (this.data[nameList[0]]) {
        nameMap[nameList[0]] = this.data[nameList[0]]
      } else {
        nameMap[nameList[0]] = {}
      }
      nameMap[nameList[0]][nameList[1]] = val
    } else {
      nameMap[name] = val
    }
    this.setData(nameMap)
  },
  inputChange(e) {
    let name = e.currentTarget.dataset.name;
    let val = e.detail.value;
    if (val == null) {
      val = e.detail.value;
    }
    let nameMap = {}
    if (name.indexOf('.') > -1) {
      let nameList = name.split('.')
      if (this.data[nameList[0]]) {
        nameMap[nameList[0]] = this.data[nameList[0]]
      } else {
        nameMap[nameList[0]] = {}
      }
      nameMap[nameList[0]][nameList[1]] = val
    } else {
      nameMap[name] = val
    }
    this.setData(nameMap)
  },
  radioChange(e) { //处理界面上的单选按钮
    let name = e.currentTarget.dataset.name;
    let val = e.currentTarget.dataset.value;
    let oldValue = this.data[name];
    let nameMap = {}
    if (name.indexOf('.') > -1) {
      let nameList = name.split('.')
      if (this.data[nameList[0]]) {
        nameMap[nameList[0]] = this.data[nameList[0]]
      } else {
        nameMap[nameList[0]] = {}
      }
      nameMap[nameList[0]][nameList[1]] = val
    } else {
      nameMap[name] = val
    }
    //此处可以设置单选的时候是否可以取消
    // if (oldValue == val) {
    //   nameMap[name] = null;
    // }
    this.setData(nameMap)
  },
  toggle(e) //展开折叠切换
  {
    var that = this;
    let name = e.currentTarget.dataset.name;
    let oldValue = this.data[name];
    let nameMap = {}
    if (oldValue == null) {
      oldValue = false;
    }

    nameMap[name] = !oldValue;
    this.setData(nameMap)
  },
  goto: function (e) {
    var url = e.currentTarget.dataset["url"];
    wx.navigateTo({
      url: url
    })
  },
  callphone: function (e) {
    var phoneNumber = e.currentTarget.dataset["phone"];
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
    })
  },
  getCurrentLocal(paramname) { // 选择地址，paramname：获取到的详细地址赋值给某变量
    let that = this;
    //获取当前地理定位权限
    let getCurrentLocalvoid = new Promise(function (resolve1, reject1) {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userLocation'] == false) { // 如果已拒绝授权，则打开设置页面
            //跳转到授权页面
            wx.navigateTo({
              url: '/pages/methods/authorization',
            })
          } else { // 第一次授权，或者已授权，直接调用相关api
            resolve1(getMyLocation);
          }
        }
      })
    });

    //获取当前地理定位坐标
    let getMyLocation = new Promise(function (resolve2, reject2) {
      wx.getLocation({
        type: 'gcj02',
        success(res) {
          //将经纬度赋值
          console.log(res);
          resolve2(res);
        }
      })
    })
    return new Promise((resolve, reject) => {
      getCurrentLocalvoid.then(function (e) {
        return that.chooseLocation(e);
      }).then(b=>{
        resolve(b);
      })
    });
  },
  chooseLocation: function (e) { //选择地址
    return new Promise((resolve, reject) => {
      //选择地址
      wx.chooseLocation({
        latitude: e.latitude,
        longitude: e.longitude,
        success: function (res) {
          //将选择得地址进行赋值
          resolve(res)
        },
      });
    });
  },
}