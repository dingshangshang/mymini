// components/navbar/index.js
const App = getApp();

Component({
  options: {
    addGlobalClass: true,
    multipleSlots:true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    pageName:{
      type: String,
      value: ''
    },
    showReturn: {
      type: Boolean,
      value: true
    },
    showHome: {
      type: Boolean,
      value: true
    },
    bgColor:{
      type:String,
      value:"#F76732"
    },
    fontColor:{
      type:String,
      value:"#ffffff"
    },
    titleSlot:{
      type: Boolean,
      value: false
    },
    fixed:{
      type: Boolean,
      value: false
    },
    haveContent:{
      type: Boolean,
      value: false
    },
    fill:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   
  },
  lifetimes: {
    attached: function () {

      var pages = getCurrentPages() //获取加载的页面
      var currentPage = pages[pages.length-1] //获取当前页面的对象
      var url = currentPage.route //当前页面url
      // var options = currentPage.options //如果要获取url中所带的参数可以查看options
      if(url=="pages/index/index") //如果是主页，则隐藏返回上一页/转到主页按钮，显示其它功能
      {
        this.setData({pageType:1});//pagetype: 1-主页
      }
      this.setData({
        navHeight: App.globalData.navHeight,
        navTop: App.globalData.navTop
      })
     }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //回退
    navBack: function () {
        wx.navigateBack({
          delta: 1
        })      
    },
    //回主页
    toIndex: function () {
      wx.redirectTo({
        url: '/pages/index/index'
      })
    },
    toggleShow:function(e)//切换导航栏的fixed
    {
      if(this.data.fixed){
        this.setData({ fixed: false });
      }
    },
    setFixed(flag){
      this.setData({ fixed: flag });
    },
    toggleHide:function(e)//切换导航栏的fixed
    {

      if(!this.data.fixed){
        this.setData({ fixed: true });
      }
    }
  }
})