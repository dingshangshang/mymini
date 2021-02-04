// pages/components/numberControl/numberControl.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    usableContainerCount: {
      type: Number,
      value: 100,
      observer: function (newVal) {
        if (Number(newVal) <= 0 || newVal == null || newVal == '') {
          this.setData({usableContainerCount:1000});
        }
      }
    },
    number: Number,
    minNumber: { //最小值
      type: Number,
      value: 0
    },
    index: {
      type: String, //使其支持多维数组
      value: "-1"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    number: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setNumber(number) //设置值
    {
      this.setData({number:number});
    },
    subtraction: function () {
      var that = this;
      var number = this.data.number;
      if (number > that.data.minNumber) {
        this.setData({
          number: number - 1
        });
      }
      this.triggerEvent('numberChangeBind', {
        value: this.data.number,
        index: that.data.index
      }) // 触发 事件，将时间的值传到母页中
    },
    add: function () {
      var that = this;
      var number = this.data.number;
      if (Number(this.data.usableContainerCount) > Number(number)) {
        this.setData({
          number: Number(number) + 1
        });
        this.triggerEvent('numberChangeBind', {
          value: this.data.number,
          index: that.data.index
        }) // 触发 事件，将时间的值传到母页中
      }
    },
    numberchange: function (e) {
      var that = this;
      var val = e.detail.value;
      if(Number(val)<Number(that.data.minNumber))
      {
        val=that.data.minNumber;
      }
      if (Number(this.data.usableContainerCount) >= Number(val)) {
        this.setData({
          number: val
        });
        this.triggerEvent('numberChangeBind', {
          value: val,
          index: that.data.index
        }) // 触发 事件，将时间的值传到母页中
      } else {
        val = this.data.usableContainerCount;
        this.setData({
          number: val
        });
        this.triggerEvent('numberChangeBind', {
          value: val,
          index: that.data.index
        }) // 触发 事件，将时间的值传到母页中
      }
    }
  }
})