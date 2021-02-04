// components/star/star.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    number:{
      type:Number,
      value:5
    },
    isreadonly:{
      type:Number,
      value:1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    starCount:5
  },

  /**
   * 组件的方法列表
   */
  methods: {
    dian:function(e){
      var isreadonly=this.data.isreadonly;
      if(isreadonly!==1)
      {
        var number_now=e.currentTarget.dataset["number"];
        var number=this.data.number;
        this.setData({number:(number==number_now?number_now-1:number_now)});
      }
    },
    getNumber() //获取当前的数字
    {
      return this.data.number;
    }
  }
})
