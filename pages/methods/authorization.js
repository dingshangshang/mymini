var app = getApp()
Page({
  data: {
  },
  onLoad: function (options) {
        
  },
  openSetting:function(){
    wx.openSetting({
      success (res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
        wx.navigateBack({
          delta: 1
        })    
      }
    })
  }
})