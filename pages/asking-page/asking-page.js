// pages/asking-page/asking-page.js
const app = getApp()
const AV = require('../../utils/av-weapp-min.js');
const baseUrl = "http://localhost:3000/api/v1/"
// const baseUrl = "https://ask-the-crowd.wogengapp.cn/api/v1/"

Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.loadFontFace({
      family: 'Concert One',
      source: 'url("/img/ConcertOne-Regular.ttf")',
      success: console.log()
    })
    wx.loadFontFace({
      family: 'BenMo',
      source: 'url("/img/BenMoYouYuan-2.ttf")',
      success: console.log()
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  getPhoto(e) {
    const page = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        let tempFilePath = res.tempFilePaths[0];
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(
          file => {console.log(file.url())
            const field = e.currentTarget.dataset.name
            const oldData = page.data
            oldData[field] = file.url()
            page.setData({ ...oldData })
            if (field == 'photoq') { page.setData({ shadowq: "active" }); }
            if (field == 'photoa') { page.setData({ shadowa: "active" }); }
            if (field == 'photob') { page.setData({ shadowb: "active" }); }
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1200
            })
          }
        ).catch(console.error);
      }
    })
  },

  handleChange: function (e) {
    const page = this
    const field = e.currentTarget.dataset.name
    const value = e.detail.value
    const oldData = page.data
    oldData[field] = value
    oldData['userid'] = wx.getStorageSync('userid')
    page.setData({ ...oldData })
  },

  submitQ: function (e) {
    const page = this
    const app = getApp()
    const { title, photoq, texta, photoa, textb, photob, userid } = page.data
    wx.request({
      url: baseUrl + 'questions/',
      method: 'post',
      data: page.data,
      success: function (res) {
        console.log(res)
        const id = res.data.question_info.id
        wx.reLaunch({
          url: `/pages/preview-page/preview-page?id=${id}`
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })

    wx.navigateTo({
      url: '../preview-page/preview-page',
    })
  },

})