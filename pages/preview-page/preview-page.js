// pages/preview-page/preview-page.js
import apiClient from "../../utils/apiClient.js"

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
    const page = this
    const id = options.id
    console.log(options)
    this.setData({
      question_id:id
    })
    const getOptions = {
      id,
      success: function (res) {
        console.log(res)
        const question = res.data.question_info
        console.log("question", question)
        if (question.choice_one.photo == null) { 
          question.choice_one.photo = '/img/black.jpg', 
          page.setData({ c1text: question.choice_one.text })
          }
        if (question.choice_two.photo == null) { 
          question.choice_two.photo = '/img/black.jpg',
          page.setData({ c2text: question.choice_two.text })
          }
        page.setData({
          question,
          bigphoto: question.choice_one.photo,
          bigtext: question.choice_one.text
        })
        console.log(question)
      },
      fail: function (err) {
        console.log(err)
      }
    }

    apiClient.getQuestion(getOptions)

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
  onShareAppMessage: function (ops) {
    const page = this
    const question_id = page.data.question_id
    console.log(question_id)
    if (ops.from === 'button') {
      console.log(ops.target)
    }
    return {
      title: 'Help me out',
      imageUrl: '/img/timg.jpg', //图片地址
      path: `/pages/sharing-to-frnd/sharing-to-frnd?id=${question_id}`,// 用户点击首先进入的当前页面
      success: function (res) {
        console.log("转发成功:");
        
      },
      fail: function (res) {
        console.log("转发失败:");
      }
    }
  },

  SwitchImage1: function (e) {
    const question = this.data.question
    this.setData({ 
      bigphoto: question.choice_one.photo,
      bigtext: question.choice_one.text,
      toggleactive1: 'active',
      toggleactive2: ''
    })
  },
  SwitchImage2: function (e) {
    const question = this.data.question
    this.setData({
      bigphoto: question.choice_two.photo,
      bigtext: question.choice_two.text,
      toggleactive1: '',
      toggleactive2: 'active'
    })
  },

  activateQuestion: function(){
    const page = this
    const id = page.data.question_id
    console.log(id)
    const getOptions = {
      id,
      success: function (res) {
        wx.reLaunch({
          url: '../index/index',
        })
        console.log(res)
        const question = res.data.question_info
        console.log("question", question)
        if (question.choice_one.photo == null) {
          question.choice_one.photo = '/img/black.jpg',
            page.setData({ c1text: question.choice_one.text })
        }
        if (question.choice_two.photo == null) {
          question.choice_two.photo = '/img/black.jpg',
            page.setData({ c2text: question.choice_two.text })
        }
        page.setData({
          question,
          bigphoto: question.choice_one.photo,
          bigtext: question.choice_one.text
        })
        console.log(question)
      },
      fail: function (err) {
        console.log(err)
      }
    }

    apiClient.activateQuestion(getOptions)
  },

  toIndex: function() {
    wx.reLaunch({
      url: '../index/index',
    })
  },

})