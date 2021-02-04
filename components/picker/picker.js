const app = getApp()

Component({
  properties: {
    pickData: {
      type: Object,
      value: {},
      observer: function(newVal) {
        if (typeof newVal === 'object') {
          this.setData({listData: Object.values(newVal)})
        }
      }
    },
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
    _closePicker () {
      let {pickeDate} = this.data
      this.triggerEvent('close', pickeDate)
      this.setData({isOpen: false})
    },
    setListData(list,val=null){ //重新设置下拉框数据和设置选中项
      var length=list.length;
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
        vals=val.split(",");
        valIndexList=[];
        for(var i=0;i<list.length;i++)
        {
          var item=list[i];
          for(var a=0;a<item.length;a++)
          {
            if(item[a].id==val[i])
            {
              pickeDate[i]=item[a];
              value[i]=a;
            }
          }
        }
      }
      this.setData({
        pickeDate:pickeDate,
        listData:list,
        value:value
      });
    },
    _bindChange (e) {
      const val = e.detail.value
      let {pickeDate} = this.data
      Object.values(this.data.pickData).forEach((item, i) => {
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