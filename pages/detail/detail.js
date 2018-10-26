// pages/detail/detail.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"0",
    title:"",
    from:"中国新闻网",
    date:"09:34",
    read:"",
    content:[],
    imagePath:"",
    haveDetail:1,
    navH: App.globalData.navHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id : options.id,
      navH: App.globalData.navHeight
    })
    this.getDetail()
  },
  getDetail(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data:{
        id: this.data.id
      },
      success: res =>{
        let result = res.data.result;
        this.showDetail(result);
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  showDetail(result){
    if (result.source == "") result.source = "未知来源";
    if (result.date == "") result.date = "未知时间";
    else result.date = result.date.substring(5, 10) + " " + result.date.substring(11, 16); //选取部分的时间
    let content = result.content;
    let haveDetail = 1;
    let newsContent = [];
    if(content.length == 0) haveDetail = 0;//新闻是否有细节
    for (let i = 0; i < content.length;i++){
      let oneContent = content[i];
      if(oneContent.type=="image"){
        let theTitle = ""; //图片的来源
        if (i + 1 < content.length && content[i + 1].type != "image" && content[i+1].text.length <= 25){ //图片是不是有来源,我不知道怎么判断,所以就当图片的后面一句话如果字符数不大于25就认定为标题
          theTitle = content[i + 1].text;
          i = i + 1;
        }
        newsContent.push({
          type: 0,
          answer: oneContent.src,
          from: theTitle
        })
      }
      if (oneContent.type == "p") {
        newsContent.push({
          type: 1,
          answer:  oneContent.text,
          from: ""
        })
      }
      if (oneContent.type == "strong") {
        newsContent.push({
          type: 2,
          answer: oneContent.text,
          from: ""
        })
      }
    }
    this.setData({
      content:newsContent,
      title:result.title,
      read: "阅读数 : " + result.readCount,
      imagePath:result.firstImage,
      date:result.date,
      from:result.source,
      haveDetail:haveDetail
    })
  },
  navBack(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  /**
   * 生命周期函数--监听页面隐藏
   */
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})