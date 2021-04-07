// index.js
// 获取应用实例
const app = getApp()
// pages/index/index.js
import {
  urlApi
} from '../../utils/request';
Page({
  data: {
    value:''
  },

  onLoad() {
 
  },
  jiexi: function () {
    const that=this;
    wx.getClipboardData({
      success (res){
        console.log(res.data)
        if(res.data){
          that.setData({
             value:res.data
          });
           urlApi(`paqu?url=${res.data}`,'POST',{}).then(response=>{
             if (response.data.list.length) {
               let arr = response.data.list.filter((item) => item.form == 'MP4');
               if (arr.length) {
                 wx.navigateTo({
                   url: '/pages/logs/logs?url='+res.data,
                 })
               } else { 
                wx.showToast({
                  title:'您输入的链接不正确',
                  icon:'none'
                })
               }
            }else{
              wx.showToast({
                title:'您输入的链接不正确',
                icon:'none'
              })
            }
          
          })        
        }else{
          wx.showToast({
            title: '请粘贴推特链接',
            icon:'none'
          })
        }
      }
    })
  }
})
