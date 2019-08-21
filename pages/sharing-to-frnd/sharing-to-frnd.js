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
      question_id: id,
    })
    // const question_id = page.data
    // console.log("question_id", question_id)
    const getOptions = {
      id,
      success: function (res) {
        console.log(res)
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


    // this.setData({ disabled: true })


  SwitchImage1: function (e) {
    const page = this
    console.log(111111, e)
    const choice_id = e.currentTarget.dataset.choice_id
    console.log("choice_id", choice_id)
    const question_id = e.currentTarget.dataset.qid
    console.log("question_id", question_id)
    page.setData({
      question_id: question_id,
      choice_id: choice_id
    })
    // console.log(e.target.dataset.url)
    // const q = page.data.questions
    // const new_qs = q.map(function (element) {
    //   if (element.id == e.currentTarget.dataset.qid) {
    //     element.photo = e.currentTarget.dataset.url
    //     element.choice_text = e.currentTarget.dataset.text
    //     return element
    //   } else {
    //     return element
    //   }
    // });
    // console.log(new_qs)
    // this.setData({
    //   questions: new_qs,
    // })
  },
  SwitchImage2: function (e) {
    const page = this
    console.log(111111, e)
    const choice_id = e.currentTarget.dataset.choice_id
    console.log("choice_id", choice_id)
    const question_id = e.currentTarget.dataset.qid
    console.log("question_id", question_id)
    page.setData({
      question_id: question_id,
      choice_id: choice_id
    })
    // const q = this.data.questions
    // const new_qs = q.map(function (element) {
    //   if (element.id == e.currentTarget.dataset.qid) {
    //     element.photo = e.currentTarget.dataset.url
    //     element.choice_text = e.currentTarget.dataset.text
    //     return element
    //   } else {
    //     return element
    //   }
    // });
    // this.setData({
    //   questions: new_qs,
    // })
  },


  kindToggle: function (e) {
    const page = this
    const app = getApp()
    const question_id = page.data.question_id
    console.log("question_id", question_id)
    const choice_id = page.data.choice_id
    console.log("choice_id", choice_id)
    const user_id = wx.getStorageSync('userid')
    console.log("user_id", user_id)
    const newAnswer = {
      question_id,
      choice_id,
      user_id
    }
    console.log("parameters_hash", newAnswer)
    apiClient.createAnswer({
      data: newAnswer,
      success: function (res) {
        console.log(res)
        const question = res.data.question_lists
        console.log(33333, question)
        const questiontwo = page.data.question
        // get the current list of questions
        // find the index of the updated question
        // replace the current data with the updated data
        // setData using the updated array
        Object.assign(question, questiontwo)
        page.setData({
          questiontwo
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
    const pageone = this
    console.log(pageone)
    const questionthree = pageone.data.questiontwo
    console.log(questionthree)
    questionthree.open = true
    questionthree.percentage_one = Math.round(questionthree.percentage_one)
    questionthree.percentage_two = Math.round(questionthree.percentage_two)
    // const q = this.data.question
    // const new_qs1 = q.map(function (element) {
    //   // console.log(element)
    //   // console.log(111111, element.id == e.currentTarget.dataset.id)
    //   // console.log(element.id)
    //   // console.log(5555, e.currentTarget.dataset)
    //   if (element.id === e.currentTarget.dataset.id) {
        const questiontwo = page.data.questiontwo

    //     return element
    //   } else {
    //     return element
    //   }
    // })
    // console.log(1111111, new_qs1)
    // this.setData({
    //   questions: new_qs1
    // });
  },
})