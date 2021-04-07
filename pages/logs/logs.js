// logs.js
const util = require('../../utils/util.js')
import {
  urlApi
} from '../../utils/request';
Page({
  data: {
    logs: [],
  },
  onLoad: function (options) {
       this.getData(options.url||'https://twitter.com/XijinLi/status/1374440262940782595?s=19')
  },
  getData:function(url){
    urlApi(`paqu?url=${url}`,'POST',{}).then(response=>{
      if (response.data.list.length) {
         this.setData({
          logs:response.data.list.filter((item) => item.form == 'MP4')
         })
     } 
   })      
  },
  fzLink:function(e){
    let that = this;
        if(e.currentTarget.dataset.type=="1"){
          // wx.getClipboardData({
            wx.setClipboardData({
              data: e.currentTarget.dataset.url,
            });
            wx.showToast({
              title: '复制成功',
              icon:'none'
            })
        }else{
          wx.showLoading({
            title: '正在保存中',
            icon: 'none',
            duration: 3000
          })
          //获取相册授权
          wx.getSetting({
            success(res) {
              if (!res.authSetting['scope.writePhotosAlbum']) {
                wx.authorize({
                  scope: 'scope.writePhotosAlbum',
                  success() {
                    //这里是用户同意授权后的回调
                    that.saveImgToLocal(e.currentTarget.dataset.url);
                  },
                  fail() { //这里是用户拒绝授权后的回调
                    wx.showToast({
                      title: '相册授权失败',
                      icon:'none',
                      duration: 3000
                    });
                    wx.hideLoading();
                  }
                })
              } else { //用户已经授权过了
                that.saveImgToLocal(e.currentTarget.dataset.url);
              }
            }
          })


        }
  },
  saveImgToLocal: function (url) {
    let that = this;
    wx.downloadFile({
      url: url,
      success: function (res) {
        console.log("121111111",res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
              console.log("122222222",data);
            wx.hideLoading();
            that.setData({
              isHidden: true
            });
            wx.showToast({
              title: '相册保存成功',
              icon: 'none',
              duration:5000
            });
          },
        })
      }
    })
  },
})
