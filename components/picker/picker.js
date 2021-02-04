const app = getApp()

Component({
  properties: {
    sureStyle: {
      type: String,
      value: 'sure'
    },
    title:{
      type: String,
      value: '请选择'
    },
    cancelStyle: {
      type: String,
      value: 'cancel'
    },
    open: {
      type: Boolean,
      value: false,
      observer: function(newVal) {
        if (String(newVal) === 'true') {
          this.setData({isOpen: true})
        }
      }
    },
    maskStyle: {
      type: String,
      value: ''
    },
    indicatorStyle: {
      type: String,
      value: ''
    },
  },
  data: {
    isOpen: false,
    pickeDate: [],
    listData: [],
    value: [],
  },
  attached () {

  },
  methods: {
    init(list,val=null){ //重新设置下拉框数据和设置选中项
      console.log(list);
      var that=this;
      var value=[];
      let pickeDate = [];
      for(var x=0;x<list.length;x++)//默认全部选中第一个
      {
        var item=list[x];
        value.push(0);
        pickeDate.push(item[0]);
      }
      if(val!=null)
      {
        console.log(val);
        val=val+'';
        var vals=val.split(",");
        for(var i=0;i<list.length;i++)
        {
          var item=list[i];
          for(var a=0;a<item.length;a++)
          {
            console.log(item);
            console.log("第一个"+item[a].id);
            console.log("第二个"+vals[i]);
            if(item[a].id==vals[i])
            {
              pickeDate[i]=item[a];
              value[i]=a;
            }
          }
        }
      }
      console.log(value);
      that.setData({
        pickeDate:pickeDate,
        listData:list,
        value:value
      });
    },
    _closePicker () {
      let {pickeDate} = this.data
      this.triggerEvent('close', pickeDate)
      this.setData({isOpen: false})
    },
    _bindChange (e) {
      const val = e.detail.value
      let {pickeDate} = this.data
      Object.values(this.data.listData).forEach((item, i) => {
        pickeDate[i] = item[val[i]]
      })
      // console.log(pickeDate);
      this.setData({pickeDate:pickeDate, value: val})
    },
    _surePicker () {
      let {pickeDate} = this.data
      this.triggerEvent('sure', pickeDate)
      this.setData({isOpen: false})
      // this._openClosePicker(1)
    },
  }
})