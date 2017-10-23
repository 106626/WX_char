var API_URL="https://api.douban.com/v2/movie/in_theaters";
Page({

  data: { 
  	   title:'加载中。。',

       movies:[]
  },

  onLoad:function(){
  	var that=this;
    //API 界面 显示消息提示框
  	wx.showToast({
  		title:'加载中。。',
  		icon:'loading',
  		duration:10000
  	});

  //发起网络请求
  	wx.request({
  		url:API_URL,
  		data:{},
  		header:{
  		   "Content-Type":"json"//"Content-Type":"json" // 默认值                                                                                           
  		},
  		success:function(res){
  			//wx.hideLoading 中 隐藏 loading 提示框
  		wx.hideToast();

      var data =res.data
      that.setData({
        title:data.title,

        movies:data.subjects
        
      })
        console.log(res.data)

  		}


  	})
  }


})
