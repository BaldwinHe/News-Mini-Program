//index.js
//获取应用实例

Page({
  data:{
    type: "gn",
    firstImage: "/images/Unknown.jpg",
    firstTitle:"请检查网络连接",
    firstFrom:"Unknown",
    firstDate:"",
    listNews: [],
    firstID:0,
  },
  onPullDownRefresh(){

  },
  onLoad(){
    this.getNews();
  },
  getNews(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.type
      },
      success: res=> {
        let result = res.data.result;
        this.setFirst(result[0]);
        this.setList(result.slice(1));
      },
      complete: ()=> {
        callback && callback()
      }
    })
  },
  setFirst(result){
    if(result.source == "") result.source = "未知来源";
    if(result.date == "") result.date = "未知时间";
    else result.date = result.date.substring(11,16);
    this.setData({
      firstImage:result.firstImage,
      firstTitle:result.title,
      firstFrom:result.source,
      firstDate:result.date,
      firstID:result.id
    })
  },
  setList(result){
    let listNews = [];
    for(let i = 0;i<result.length;i++){
      if (result[i].source == "") result[i].source = "未知来源";
      if (result[i].date == "") result[i].date = "未知时间";
      else result[i].date = result[i].date.substring(11, 16);
      listNews.push({
        title: result[i].title,
        from: result[i].source,
        date: result[i].date,
        image: result[i].firstImage,
        id : result[i].id
      })
    }
    this.setData({ listNews:listNews });
  },
  getNewsDetail :function(event){
    let ID = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + ID,
    })
  }
})
