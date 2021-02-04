// pages/components/checkTime.js

const util = require('../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height:{
      type:Number,
      value:310
    },
    title:{
      type:String,
      value:"提示"
    },
    showBtn:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init:function(e){  //打开弹窗
      this.setData({show:true});
    },
    close:function(e){ //点击关闭
      this.setData({show:false});
    },
    sure:function(e) //点击确定
    {
      this.triggerEvent('customevent',
      {
        val:this.data.value,
      }) // 触发 事件，将时间的值传到母页中
    }
  }
})
