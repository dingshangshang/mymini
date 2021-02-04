// app.js
const apiHelper=require('./utils/apiHelper.js')
App({
  apiHelper:apiHelper,
  globalData: {
  },
  onLaunch() {
    this.getScreenHeight();
  },
  getScreenHeight() {
    //获取手机屏幕信息。设置头部高度
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
  }
})
