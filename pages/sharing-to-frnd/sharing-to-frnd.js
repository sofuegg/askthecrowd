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
    
    const getOptions = {
      id,
      success: function (res) {
        console.log(res.data)
        const question = res.data.question_info

        page.setData({
          question
        })
      },
      fail: function (err) {
        console.log(err)
      }
    }

    apiClient.shareQuestion(getOptions)

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

  newAnswer: function (e) {
    const page = this
    const app = getApp()
    console.log(e)
    const question_id = page.data.question_id
    console.log(question_id)
    const choice_id = e.currentTarget.dataset.choice_id
    const user_id = wx.getStorageSync('userid')
    const newAnswer = {
      question_id,
      choice_id,
      user_id
    }
    apiClient.createAnswer({ data: newAnswer })

    const getOptions = {
      id: question_id,
      success: function (res) {
        const question = res.data.question_info
        page.setData({
          question
        })
      },
      fail: function (err) {
        console.log(err)
      }
    }

    apiClient.getQuestion(getOptions)
  }
})