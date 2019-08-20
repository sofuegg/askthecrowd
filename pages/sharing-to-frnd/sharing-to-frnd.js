// pages/sharing-to-frnd/sharing-to-frnd.js
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
    const { id } = options
    this.setData({
      question_id: id
    })
    const getOptions = {
      id,
      success: function (res) {
        const question = res.data.question_info
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
      },
      fail: function (err) {
        console.log(err)
      }
    }
    apiClient.getQuestion(getOptions)
    
    wx.loadFontFace({
      family: 'Concert One',
      source: 'url("http://lc-qinkssxt.cn-n1.lcfile.com/d8eab2fdfbc672c39e71/ConcertOne-Regular.ttf")',
      success: console.log()
    })
    wx.loadFontFace({
      family: 'BenMo',
      source: 'url("http://lc-qinkssxt.cn-n1.lcfile.com/74ad43d3a3b717fba000/BenMoYouYuan-2.ttf")',
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
    // if (wx.hideLoading) {    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    //   wx.hideLoading();
    // } else {
    //   wx.hideToast();
    // }

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

  newAnswer: function (e) {
    const page = this
    const app = getApp()
    const question_id = page.data.question_id
    console.log("question_id", question_id)
    const choice_id = e.currentTarget.dataset.choice_id
    console.log("choice_id", choice_id)
    const user_id = wx.getStorageSync('userid')
    const newAnswer = {
      question_id,
      choice_id,
      user_id
    }
    console.log("new_anser_info", newAnswer)    
    apiClient.createAnswer({ data: newAnswer })

    const getOptions = {
      id: question_id,
      success: function (res) {
        const question = res.data.question_info
        page.setData({
          question,
        })
      },
      fail: function (err) {
        console.log(err)
      }
    }

    apiClient.getQuestion(getOptions)
    this.setData({ disabled: true })

  },
  SwitchImage1: function (e) {
    const question = this.data.question
    this.setData({
      bigphoto: question.choice_one.photo,
      bigtext: question.choice_one.text
    })
  },
  SwitchImage2: function (e) {
    const question = this.data.question
    this.setData({
      bigphoto: question.choice_two.photo,
      bigtext: question.choice_two.text
    })
  },
  kindToggle: function (e) {
    console.log(e)
    const q = this.data.question
    q.open = true
    q.percentage_one = Math.round(q.percentage_one)
    q.percentage_two = Math.round(q.percentage_two)
    this.setData({
      question: q
    });
  }
})