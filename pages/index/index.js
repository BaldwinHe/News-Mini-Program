//index.js
//获取应用实例
const App = getApp();
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
  "gn": 0,
  "gj": 1,
  "cj": 2,
  "yl": 3,
  "js": 4,
  "ty": 5,
  "other": 6
}
const typeName = ["国内", "国际", "财经", "娱乐", "军事", "体育", "其他"]; 
Page({
  data:{
    type: "gn",
    firstImage: "/images/Unknown.jpg", //没网时候的默认图片
    firstTitle:"请检查网络连接",
    firstFrom:"Unknown",
    firstDate:"",
    listNews: [], //新闻的Type
    firstID:0,
    newsType: "",
    theSelectType: 0, 
    navH: App.globalData.navHeight //自定义导航栏
  },
  onPullDownRefresh(){
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  },
  onLoad: function (options) {
    let newsList = [];
    for (let k = 0; k <= 6; k++) { //把分类整出来
      newsList.push({
        name: typeName[k],
        id: k
      })
    }
    this.setData({
      newsType: newsList,
      navH: App.globalData.navHeight,
      type: App.globalData.typeBefore, //从新闻细节返回时能返回之前点进去的父页面
      theSelectType: typeID[App.globalData.typeBefore]
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
        this.setFirst(result[0]); //设置第一个大新闻
        this.setList(result.slice(1));
      },
      complete: ()=> {
        callback && callback()
      }
    })
  },
  setFirst(result){
    if(result.source == "") result.source = "未知来源"; //什么东西都没有时的默认值
    if (result.date == "") result.date = "未知时间"; //什么东西都没有时的默认值
    else result.date = result.date.substring(11,16); //选取部分的时间
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
    let ID = event.currentTarget.dataset.id; //把当前所选的新闻交给下一个页面
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + ID,
    })
  },
  selectType: function (event) { //切换选择的新闻类别
    let ans = event.currentTarget.dataset.id
    let theType = typeMap[ans.name];
    let theID = ans.id;
    App.globalData.typeBefore = theType;
    this.setData({
      type: theType,
      theSelectType: theID
    })
    this.getNews();
  } 
})
