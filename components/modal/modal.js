// components/popups/popups.js
Component({
  // externalClasses: ['m-btn'],
  options: {
  multipleSlots: true
  },
  /**
  * 组件的属性列表
  */
  // properties: {
  //   //是否显示modal
  //   show: {
  //     type: Boolean,
  //     value: false
  //   },
  //   //modal的高度
  //   height: {
  //     type: String,
  //     value: ''
  //   },
  //   title: {
  //     type:String,
  //     value:"标题"
  //   },
  // },
    /**
   * 组件的属性列表
   *  show: false,//modal是否显示，默认false
      height: '',//modal显示内容高度，默认为50%
      title: '',//modal标题，默认提示
      showCancel: false,//是否显示取消按钮，默认显示
      cancelText: '取消',//取消按钮标题，默认为取消
      cancelColor: '',//取消按钮标题颜色，默认为#000000
      confirmText: '',//确定按钮标题，默认为确定
      confirmColor: '',//确定按钮标题颜色，默认为#3cc51f
      clickClose:true//点击取消或确认按钮后是否关闭modal,默认为true
   */
  properties: {
    modal: {
      type: Object,
      value: {
        show: false,
        height: '',
        title: '',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '',
        confirmText: '',
        confirmColor: '',
        clickClose: true,
        haveBtn:''
      }
    }
  },
  /**
  * 组件的初始数据
  */
  data: {
    modalDefault: {
      show: false,
      height: '50%',
      title: '提示',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: 'white',
      clickClose: true,
      haveBtn:true
    }
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    init(modal){
      this.setData({modal:modal});
    },
    /**
     * 取消按钮事件
     */
    modalCancel() {
      this.modalShowChange();
    },
    /**
     * 确定按钮事件
     */
    modalConfirm() {
      this.triggerEvent('success', {
        res: 'confirm'
      })
    },
    /**
     * 弹框显示属性更改
     */
    modalShowChange: function() {
      let clickClose = this.data.modalDefault.clickClose;
      if (this.data.modal && this.data.modal.clickClose != undefined) {
        if (this.data.modal.clickClose == false) {
          clickClose = false
        }
      }
      if (clickClose) {
        let objModal = {
          show: false
        }
        this.setData({
          modal: objModal
        })
      }
    }
  }
 })