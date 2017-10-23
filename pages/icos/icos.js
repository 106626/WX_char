var util = require('../../utils/util.js');
var changeData = '';
var time='';
Page({
  data: {
    index: 1,
    times: '',
    _time: '',
    date: '',
    changeData: ''
  },

  //获取手机上的日期
  onLoad: function () {
    var time = util.formatTime(new Date());
    this.setData({
      _time: time
    });
    console.log(time)
  },
  //设置时间
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      times: e.detail.value
    })
  },
  //设置日期
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      changeData: e.detail.value.replace(/-/g,':'), 
    })
  },
//上传闹钟日期和时间
  _addTime: function (e) {
    wx.request({
      url: 'http://www.wangxinshuo.top/upload.php?info='  + this.data.changeData+':'+ this.data.times,
      method: 'GET',
      data: {
    'credit':'18735572024'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        wx.showToast({
        title: '设置成功',
        icon: 'success',
        duration: 2000
                   })
                             }
            })
     },


})