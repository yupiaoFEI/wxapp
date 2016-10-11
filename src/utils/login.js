var util = require('./util.js')
let retry_times = 0
const app = getApp()

function getOpenID(code) {
  var requestId = util.guid()
  wx.request({
    url: 'https://wxapp.wepiao.com/cgi/wx/weimovie_logincheck?code=' + code,
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Request-Id': requestId,
    },
    success: function(data) {
      if(!data.data.ret) {
        console.log('log in success => ', data.data.data.WxappOpenId);
        // ret = 0, success
        // cache openid in global area
        app.globalData['WxappOpenId'] = data.data.data.WxappOpenId

        // wx.setStorage({
        //   key: 'WxappOpenId',
        //   data: data.data.data.WxappOpenId,
        // })
      } else {
        // retry again
        console.error('openid retrieve failed');
        console.error('requestid: ', requestId);
        console.error('code: ', code);
        console.error('try times: ', retry_times);
        console.error('response ', data)
        // only allow 3 times retry
        if(retry_times <= 2) {
          login()
        }
        retry_times++;
      }
    },
    fail: function(error) {
      console.log('error', error)
    }
  })
}

function login() {
  console.log(app.globalData, 'global data cache');
  if(app.globalData.WxappOpenId) {
    // no need login
    return
  } else {
    wx.login({
      success: function(res) {
        if (res.code) {
          // fetch openid
          getOpenID(res.code)
        } else {
          console.error('wx login no res code', res);
        }
      },
      fail: function(err) {
        console.error('wx login fail', err);
      }
    })
  }
}

module.exports = {
  login: login,
}
