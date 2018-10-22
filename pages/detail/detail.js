// pages/detail/detail.js
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
    content:"",
    imagePath:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id : options.id
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
    else result.date = result.date.substring(11, 16);
    this.setData({
      title:result.title,
      read: "阅读数 : " + result.readCount,
      imagePath:result.firstImage,
      date:result.date,
      from:result.source
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