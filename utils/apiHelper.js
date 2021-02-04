
const util = require('../utils/util.js')
const constjs=require('../utils/const.js')
/**
 * 抓取远端API的结构
 * https://developers.douban.com/wiki/?title=movie_v2
 * @param  {String} api    api 根地址
 * @param  {String} path   请求路径
 * @param  {Objece} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */
module.exports = function (path, params, requesttype = "1",method="POST",showLoad=true) {
  if (isMock(path) && constjs.debug) {
    return mock(path, params);
  }
  return api(path, params, requesttype,method,showLoad);
}

//调用api方法
function api(path, params, requesttype,method,showLoad) {
  console.log("接口path:"+path);
  console.log(JSON.stringify(params));
  return new Promise((resolve, reject) => {
    if(showLoad)
    {
      wx.showToast({
        icon: 'loading'
      });
    }
    var contentType = requesttype == "1" ? 'application/x-www-form-urlencoded' : 'application/json';
    var cookie = wx.getStorageSync("cookie");
    var responseType=path=="api/file/DownloadFile"?"arraybuffer":"text";
    var apiurl=constjs.api_url;
    wx.request({
      url: `${apiurl}/${path}`,
      data: params,
      responseType:responseType,
      header: {
        'cookie': cookie,
        'content-type': contentType,
      },
      method: method,
      complete: function (e) {
        if (e.statusCode == 401) //如果返回来是401，则进行登录
        {
          // util.showFailMsg("登录状态已过期，请重新登录", function () {
          //   wx.clearStorageSync();
          //   wx.navigateTo({ //跳转到登录页面
          //     url: '/pages/personalCenter/login'
          //   })
          // });
        } else {
          if (e.statusCode != 200) {
            util.showFailMsg("服务器异常");
          }
        }
        if(showLoad) wx.hideToast();
      },
      success: function (e) { //设置登录api缓存cookie
        if (path == "Account/LoginApi") {
          wx.setStorageSync("cookie", e.header["Set-Cookie"]);
        }
        resolve(e.data);
      },
      fail: function (e) {
        console.log("失败");
        console.log(e)
        reject
      }
    });
  })
}

//判断是否使用模拟数据（没有配置该路径的模拟数据或者swich为false都不使用模拟数据）
function isMock(path) {
  var mock = require("./mock.js");
  var mockList = mock.mocklist;
  var obj = mockList.filter(a => a.requestUrl == path);
  if (obj != null && obj.length > 0) {
    return true;
  } else {
    return false;
  }
}

//调用mock
function mock(path, params) {
  return new Promise((resolve, reject) => {
    if (path) {
      const mock = require('./mock.js')
      var url = mock.mocklist.filter(a => a.requestUrl == path)[0].fileUrl;
      const response = require(url);
      var res = response(params);
      resolve(res);
    } else {
      reject();
    }
  });
}