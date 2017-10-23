
 var tempFilePaths =[];
 // var tempFilePath=''; 

Page({
 data:{
   on: 'true',
   imgSrc:[],
   progress:0,//进度条
  
   tempFilePath: ''
 },

 onLoad:function()
 {
     wx.showToast({
  title: '管家小微为你服务',
   icon: 'waiting',
  duration: 1000
}),

//获取用户同意录音
     wx.getSetting({
    success(res) {
        if (!res.authSetting['scope.record']) {
            wx.authorize({
                scope: 'scope.record',
                success() {
                    // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                    wx.startRecord()
                },
              fail(){
              wx.showToast({
              title: '无法进行语音识别',
              icon: 'loading',
              duration: 2000
                 })
                }
            })
        }
    }
})
     },



 //开始录音 
recordStart:function(){
 var that=this;
   this.startTime=new Date();
  wx.startRecord({
  success: function(res) {

that.setData({
  tempFilePath: res.tempFilePath
})
     // this.tempFilePath = res.tempFilePath ;
   var diff=(that.endTime-that.startTime)/1000;
      diff=Math.ceil(diff);//大于等于 取整数 
      console.log(diff)
       } , 
  })

},



//结束录音
recordEnd:function(){
  
 this.endTime=new Date();
 wx.stopRecord();
 console.log("录音完毕")
 console.log(this.data.tempFilePath)
//上传
 wx.uploadFile({

      url:'http://www.wangxinshuo.top/upload.php',
      filePath:this.data.tempFilePath,//路径
      name:'file',
      formData:{
        'sign': '2',
         'credit':'18735572024'
      },
      success:function(res){
     var data=res.data;
     console.log(data)
      },
      fail:function(){
        console.log('fail失败');
      }
    })
    
 
   
},








//按钮
 switch1Change: function (e){
    var that=this;
    that.setData({
      on:!that.data.on
    })
    },

//选择图片
  upLoadImg:function(event){
   var that=this;
wx.chooseImage({
 count: 1, // 图片选择的数量
  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  success: function (res) {
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
     
     tempFilePaths = res.tempFilePaths 
  // 显示图片
    that.setData({ 
    imgSrc: tempFilePaths[0]
   })
 
    }
  })
 },

//上传图片
UP_photo:function(e)
{console.log(tempFilePaths[0])

  wx.uploadFile({
      url:'http://www.wangxinshuo.top/upload.php',
      filePath:tempFilePaths[0],//路径
      name:'file',//文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
      formData:{
         'sign':'1',
         'credit':'18735572024'

      },
      success:function(res){
      var data1=res.data;
      console.log(data1);
      },
      fail:function(){
        console.log('fail照片失败');
      }
    })
}

 

})