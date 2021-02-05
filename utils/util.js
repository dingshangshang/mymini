module.exports = {
  showSuccessMsg: showSuccessMsg, //要引用的函数 xx:xx
  showFailMsg: showFailMsg,
  showConfirm: showConfirm,
  returnData: returnData,
  getDates: getDates,
  showConfirmM: showConfirmM,
  getDatesRange: getDatesRange,
  IsNull: IsNull,
  formatDate: formatDate,
  getCurrentDate:getCurrentDate,
  mobileAddEmpty: mobileAddEmpty,
  numberHide: numberHide,
  getDateTimeCompare: getDateTimeCompare,
  randomString: randomString,
}

//格式化日期start
function formatDate(strDate) {
  if (strDate == null || strDate == "") {
    return strDate;
  }
  var realDate = new Date(strDate);
  var month = Number(realDate.getMonth()) > 9 ? realDate.getMonth() : "0" + realDate.getMonth();
  var date = Number(realDate.getDate()) > 9 ? realDate.getDate() : "0" + realDate.getDate();
  var hours = Number(realDate.getHours()) > 9 ? realDate.getHours() : "0" + realDate.getHours();
  var minutes = Number(realDate.getMinutes()) > 9 ? realDate.getMinutes() : "0" + realDate.getMinutes();
  return realDate.getFullYear() + "/" + month + "/" + date + " " + hours + ":" + minutes;
}

//获取当前时间，并返回字符串格式
function getCurrentDate()
{
  var realDate = new Date();
  var month=realDate.getMonth()+1; //月份是根据索引来的
  var month = Number(month) > 9 ? month: "0" + month;
  var date = Number(realDate.getDate()) > 9 ? realDate.getDate() : "0" + realDate.getDate();
  var hours = Number(realDate.getHours()) > 9 ? realDate.getHours() : "0" + realDate.getHours();
  var minutes = Number(realDate.getMinutes()) > 9 ? realDate.getMinutes() : "0" + realDate.getMinutes();
  return realDate.getFullYear() + "/" + month + "/" + date + " " + hours + ":" + minutes;
}

//获取d当前时间多少天后的日期和对应星期
function getDates(days, todate = getCurrentMonthFirst()) { //todate默认参数是当前日期，可以传入对应时间
  var dateArry = [];
  for (var i = 0; i < days; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj)
  }
  return dateArry;
}

//获取d当前时间多少天后的日期和对应星期
function getDatesRange(fromdate, todate) { //todate默认参数是当前日期，可以传入对应时间
  var dateArry = [];
  var flag = true;
  var i = 0;
  while (flag) {
    //组装日期进行比较
    var startdate = new Date(fromdate);
    startdate.setDate(startdate.getDate() + i);
    startdate.setHours(0, 0, 0)
    var enddate = new Date(todate);
    enddate.setHours(0, 0, 0)
    if (startdate <= enddate) {
      var dateObj = dateLater(fromdate, i);
      dateArry.push(dateObj);
      i++;
    } else {
      flag = false;
    }
  }
  return dateArry;
}

/**
 * 传入时间后几天
 * param：传入时间：dates:"2018-04-02",later:往后多少天
 */
function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  dateObj.year = date.getFullYear();
  dateObj.month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
  dateObj.day = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  dateObj.week = show_day[day];
  return dateObj;
}

//获取当前时间
function getCurrentMonthFirst() {
  var date = new Date();
  var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  return todate;
}

//将null置换为空字符串end
function mobileAddEmpty(obj) {
  var value = obj;
  value = value.replace(/\s*/g, "");
  var result = [];
  for (var i = 0; i < value.length; i++) {
    if (i == 3 || i == 7) {
      result.push(" " + value.charAt(i));
    } else {
      result.push(value.charAt(i));
    }
  }
  obj = result.join("");
  return obj;
}

//隐藏部分字符
function numberHide(value, start, end) {
  var result = [];
  for (var i = 0; i < value.length; i++) {
    if (i >= start && i <= end) {
      result.push("*");
    } else {
      result.push(value.charAt(i));
    }
  }
  value = result.join("");
  return value;
}

function showSuccessMsg(msg, success = null) //成功提示
{
  wx.showToast({
    title: msg,
    icon: 'success',
    duration: 3000,
    success: function () {
      if (success != null) {
        setTimeout(function () {
          success();
        }, 1000);
      }
    }
  });
}

function showFailMsg(msg,sure = null) { //错误提示
  wx.showModal({
    content: msg,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        if(sure!=null)
        {
          return sure();
        }
      } else {
        if (cancel != null) {
          return cancel();
        }
      }
    }
  });
}

function showConfirm(msg, sure, cancel = null) { //普通警示框
  this.showConfirmM("确定", msg, sure, cancel = cancel);
}

function showConfirmM(confirmText, msg, sure, cancel = null) { //小牛季卡专用警示框
  wx.showModal({
    title: '提示',
    content: msg,
    confirmText: confirmText,
    cancelText: "取消",
    cancelColor: '#C6C7C8', //取消文字的颜色
    confirmColor: '#F76732', //确定文字的颜色
    success: function (res) {
      if (res.confirm) {
        return sure();
      } else {
        if (cancel != null) {
          return cancel();
        }
      }
    }
  });
}

function IsNull(val) //判断是否为空，不管是空字符串还是null还是undefined
{
  return val == null || val == "" || val == undefined;
}

function returnData(val) { //如果为空，则返回0
  val = val == null || val == "" ? 0 : val;
  return val;
}

//比较两个时间差，返回 xx天xx时xx分
function getDateTimeCompare(date1, date2) {
  date1 = new Date(date1);
  date2 = new Date(date2);
  var s1 = date1.getTime(),
    s2 = date2.getTime();
  var total = (s2 - s1) / 1000; //获取相差的秒数
  var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
  var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
  var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
  var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
  var min = parseInt(afterHour / 60); //计算整数分
  var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数

  var result = "";
  if (day > 0) {
    result += (day > 9 ? day : "0" + day) + "天";
  }
  if (hour > 0) {
    result += hour > 9 ? hour : "0" + hour + "时";
  }
  result += min > 9 ? min : "0" + min + "分";
  return result
}

function randomString(length) { //生成随机字符串
  var str = '0123456789abcdefghijklmnopqrstuvwxyz'; //ABCDEFGHIJKLMNOPQRSTUVWXYZ
  var result = '';
  for (var i = length; i > 0; --i)
    result += str[Math.floor(Math.random() * str.length)];
  return result;
}