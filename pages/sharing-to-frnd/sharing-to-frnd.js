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
          question.choice_one.photo = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566219256408&di=a37943a37730803c1fc2f78c7ddf4158&imgtype=0&src=http%3A%2F%2Fdata.whicdn.com%2Fimages%2F2446679%2Flarge.jpg',
            page.setData({ c1text: question.choice_one.text })
        }
        if (question.choice_two.photo == null) {
          question.choice_two.photo = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566219256408&di=a37943a37730803c1fc2f78c7ddf4158&imgtype=0&src=http%3A%2F%2Fdata.whicdn.com%2Fimages%2F2446679%2Flarge.jpg',
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
    const photo = e.currentTarget.dataset.url
    const text = e.currentTarget.dataset.text
    page.setData({
      question_id: question_id,
      choice_id: choice_id,
      toggleactive1: "active",
      toggleactive2: "",
      bigphoto: photo,
      bigtext: text
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
    const photo = e.currentTarget.dataset.url
    const text = e.currentTarget.dataset.text
    console.log(photo)
    page.setData({
      question_id: question_id,
      choice_id: choice_id,
      toggleactive1: "",
      toggleactive2: "active",
      bigphoto: photo,
      bigtext: text
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
    const toggleactive1 = this.data.toggleactive1
    const toggleactive2 = this.data.toggleactive2
    if (toggleactive1 == 'active' || toggleactive2 == 'active') {
      const page = this
      page.setData({
        hidden: 'hidden'
      })
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
          question.choice_one = question.choice_info[0]
          question.choice_two = question.choice_info[1]
          console.log(33333, question)
          // get the current list of questions
          // find the index of the updated question
          // replace the current data with the updated data
          // setData using the updated array
          // Object.assign(question, question)
          question.open = true
          question.percentage_one = Math.round(question.percentage_one)
          question.percentage_two = Math.round(question.percentage_two)
          question.grow = true
          console.log(1111111, question)

          page.setData({
            question,
            loading: true
          })
        },
        fail: function (err) {
          console.log(err)
        }
      })
    } else {

    }
  },
  goToHome() {
    wx.reLaunch({
      url: '../index/index',
    })
  }
})