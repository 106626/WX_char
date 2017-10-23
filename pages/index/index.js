
Page({
  data:{
  inputValue:'',
  msgData:[],
  cipher:'',
  state:false
  },
  account_number:function(e){
    this.setData({
   	inputValue:e.detail.value
   
   }) 

  },

  account_mima:function(e){
    var that=this;
  that.setData({
   cipher:e.detail.value
  })
 
  },

  return_data:function(e){
    var that=this;
   that.setData({
    state:!that.data.state
   })
   
  wx.request({

  url: 'http://www.wangxinshuo.top/login.php?name='+this.data.inputValue+'&code='+this.data.cipher+'&credit=18735572024', 
  data: {
  },
  header: {
      'content-type': 'application/json'
   },
   method:'GET',
   
  success: function(res) {
 
    console.log(res.data)
  if(res.data=='1'){
  
 wx.switchTab({
    url:"../Image/Image",
    success:function(){
      console.log("跳转成功");}
   })
  }
  else{wx.showModal({
  title: '小娜提示',
  content: '登录用户的账号或密码错误',
  
  success: function(res) {
   if (res.confirm) {
    console.log('重新输入')
    } else if (res.cancel) {
      console.log('取消')
    }
  }
})}
},









})

}

})



   

 