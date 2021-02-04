/*
 * @Description:
 * @Author: wenshuang
 * @Date: 2021-01-30 15:57:21
 * @LastEditTime: 2021-02-01 16:17:37
 * @LastEditors: wenshuang
 * @Reference:
 */
// components/layout/layout.js
const App = getApp();
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  properties: {
    //自定义导航栏参数start
    navBarIsShow: {
      type: Boolean,
      value: true,
    },
    pageName: {
      type: String,
      value: '',
    },
    showReturn: {
      type: Boolean,
      value: true,
    },
    showHome: {
      type: Boolean,
      value: true,
    },
    bgColor: {
      type: String,
      value: "#F76732",
    },
    fontColor: {
      type: String,
      value: "#ffffff",
    },
    titleSlot: {
      type: Boolean,
      value: false,
    },
    fixed: {
      type: Boolean,
      value: false,
    },
    haveContent: {
      type: Boolean,
      value: false,
    },
    fill:{
      type: Boolean,
      value: false
    },
    //自定义导航栏参数end
    //自定义下拉刷新参数start
    refreshPosition:{ //刷新位置 1-导航栏上方 2-导航栏下面
      type: Number,
      value: 2,
    },
    refresh: { //默认可下拉刷新
      type: Boolean,
      value: false,
    },
    haveloadMore: { //是否显示何使用加载更多
      type: Boolean,
      value: false,
    },
    //自定义下拉刷新参数start
  },

  /**
   * 组件的初始数据
   */
  data: {},
  lifetimes: {
    attached: function () {
      var pages = getCurrentPages(); //获取加载的页面
      var currentPage = pages[pages.length - 1]; //获取当前页面的对象
      var url = currentPage.route; //当前页面url
      // var options = currentPage.options //如果要获取url中所带的参数可以查看options
      if (url == "pages/index/index") {
        //如果是主页，则隐藏返回上一页/转到主页按钮，显示其它功能
        this.setData({ pageType: 1 }); //pagetype: 1-主页
      }
      this.setData({
        navHeight: App.globalData.navHeight,
        navTop: App.globalData.navTop,
      });
    },
  },
  methods: {
    refresh(e) {
      //监听下拉刷新
      var that = this;
      if (that.data.refresh) {
        this.triggerEvent("init");
      }
    },
    loadmore(e) {
      //监听加载更多
      var that = this;
      if (that.data.haveloadMore) {
        this.triggerEvent("loadmore");
      }
    },
    setHaveLoadMore(flag) {
      //设置是否有加载更多功能（如果数据为空，则调用该方法设置为false）
      this.setData({ haveloadMore: flag });
    },
    setLoadMore(flag) {
      //设置加载更多显示toggle
      this.setData({ loadMore: flag });
      this.selectComponent("#refreshview").setLoadMore(flag); // 页面获取自定义组件实例
    },
    touchstart(e) {
      var that = this;
      var isFirst = that.data.isFirst;
      isFirst = isFirst == null ? true : isFirst;
      if (isFirst) {
        var that = this;
        let query = wx.createSelectorQuery().in(this);
        query
          .select("#body")
          .boundingClientRect((res) => {
            //获取快照距离页面顶部高度
            that.setData({
              bodyTop: res.top,
              isFirst: false,
            });
          })
          .exec();
      }
      that.setData({ touchStartY: e.changedTouches[0].clientY });
    },
    touchmove(e) {
      var that = this;
      if (
        e.changedTouches[0].clientY - this.data.touchStartY > 0 &&
        e.changedTouches[0].clientY - this.data.touchStartY < 30
      ) {
        //向上滚动
        var bodyTop = this.data.bodyTop;
        let query = wx.createSelectorQuery().in(this);
        query
          .select("#body")
          .boundingClientRect((res) => {
            //获取快照距离页面顶部高度
            if (Number(res.top) >= Number(bodyTop)) {
              if(that.data.refreshPosition==1) this.selectComponent("#navigationBar").setFixed(false);
              // that.setFixed(false);
              that.setData({ isFirst: true });
            }
          })
          .exec();
      }
      if (
        e.changedTouches[0].clientY - this.data.touchStartY < 0 &&
        this.data.touchStartY - e.changedTouches[0].clientY > 30
      ) {
        //向下滚动
        if(that.data.refreshPosition==1) this.selectComponent("#navigationBar").setFixed(true);
        // this.setFixed(true);
      }
    },
    onPageScroll(e) {
      var that=this;
      //页面滚动的时候设置页面自定义导航不fixed
      console.log(e.scrollTop);
      if (e.scrollTop < 10) {
        //判断向上滚动顶部
        if(that.data.refreshPosition==1) this.selectComponent("#navigationBar").setFixed(false);
        // this.setFixed(false);
      }
    },
    // 自定义导航栏相关start
    //回退
    // navBack: function () {
    //   console.log("点他");
    //   wx.navigateBack({
    //     delta: 1,
    //   });
    // },
    // //回主页
    // toIndex: function () {
    //   wx.navigateTo({
    //     url: "/pages/index/index",
    //   });
    // },
    // toggleShow: function (
    //   e //切换导航栏的fixed
    // ) {
    //   if (this.data.fixed) {
    //     this.setData({ fixed: false });
    //   }
    // },
    // setFixed(flag) {
    //   this.setData({ fixed: flag });
    // },
    // toggleHide: function (
    //   e //切换导航栏的fixed
    // ) {
    //   if (!this.data.fixed) {
    //     this.setData({ fixed: true });
    //   }
    // },
    //自定义导航栏相关send
  },
});
