//index.js
//获取应用实例
const typeMap = {
  "国内": "gn",
  "国际": "gj",
  "财经": "cj",
  "娱乐": "yl",
  "军事": "js",
  "体育": "ty",
  "其他": "other"
}
const typeID = {
  "国内": 0,
  "国际": 1,
  "财经": 2,
  "娱乐": 3,
  "军事": 4,
  "体育": 5,
  "其他": 6
}
const typeName = ["国内", "国际", "财经", "娱乐", "军事", "体育", "其他"]; 
Page({
  data:{
    type: "gn",
    firstImage: "/images/Unknown.jpg",
    firstTitle:"请检查网络连接",
    firstFrom:"Unknown",
    firstDate:"",
    listNews: [],
    firstID:0,
    newsType: "",
    theSelectType: 0
  },
  onPullDownRefresh(){
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  },
  onLoad(){
    let newsList = [];
    for (let k = 0; k <= 6; k++) {
      newsList.push({
        name: typeName[k],
        id: k
      })
    }
    this.setData({
      newsType: newsList
    })
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
  },
  selectType: function (event) {
    let ans = event.currentTarget.dataset.id
    let theType = typeMap[ans.name];
    let theID = ans.id;
    this.setData({
      type: theType,
      theSelectType: theID
    })
    this.getNews();
  } 
})
