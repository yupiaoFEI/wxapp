//logs.js
import {square,formatTime} from '../../utils/util'
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return formatTime(new Date(log))
      })
    })
  }
})
