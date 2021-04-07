 // var host = 'http://101.132.114.177:8090/renren-fast/';
  //  var host = 'http://r182s02546.51mypc.cn/renren-fast/';  
   var host = 'https://www.yyf2gml.site/renren-fast/';
var urlApi = (url, method, data={}) => {
  return new Promise((res, rej) => {
  
    wx.request({
      url: host + url,
      header: {
        "Content-Type": "application/json"
      },
      data: data,
      method: method,
      success: ret => {
        res(ret);
      },
      fail: rej
    })
  })
}

module.exports = {
  urlApi:urlApi,
  host
}