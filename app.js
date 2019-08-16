//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const host = 'http://localhost:3000/'
    // const host = 'https://ask-the-crowd.wogengapp.cn/'
    console.log('beginning login')

    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    
    // 登录
    const app = this
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        console.log('existing user')
      },
      fail: function(err) {
        console.log('new user')
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log(res)
            wx.request({
              url: host + 'login',
              method: 'POST',
              data: {
                code: res.code
              },
              success: (res) => {
                console.log(res)
                app.globalData.userId = res.data.userId
                wx.setStorage({
                  key: 'userid',
                  data: res.data.userId,
                })
              },
              fail: (err) => {
                console.log(err)
              }
            })
          }
        })
      }
    })
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})

const AV = require('./utils/av-weapp-min.js')
const config = require('./utils/key')
// Initialization of the app

AV.init({
  appId: config.appId,
  appKey: config.appKey,
});