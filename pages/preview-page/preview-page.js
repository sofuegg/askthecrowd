// pages/preview-page/preview-page.js

import apiClient from "../../utils/apiClient.js"

Page({
  
  /**
   * Page initial data
   */
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
      choice: 'A'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      choice: 'B'
    },
    ],
    swiperList1: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
      choice: 'A',
    }, {
      id: 1,
      type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      choice: 'B'
    },
    ],
  },

  /**
   * Lifecycle function--Called when page load
   */
  
  onLoad: function (options) {
    const page = this
    const { id } = options
    this.setData({
      question_id:id
    })
    const getOptions = {
      id,
      success: function (res) {
        const question = res.data.question_info
        console.log(question)
        page.setData({
          question
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
    if (ops.from === 'button') {
      console.log(ops.target)
    }
    return {
      title: 'Help me out',
      imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565865307522&di=7d9a32e3475ecd9a1ece81c95cb60583&imgtype=0&src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2016%2F039%2F604%2F2719406930_2104120472.jpg',//图片地址
      path: `/pages/sharing-to-frnd/sharing-to-frnd?id=${question_id}`,// 用户点击首先进入的当前页面
      success: function (res) {
        console.log("转发成功:");
        
      },
      fail: function (res) {
        console.log("转发失败:");
      }
    }

  },

  // newAnswer: function (e) {
  //   const page = this
  //   const app = getApp()
  //   console.log(e)
  //   const question_id = page.data.question_id
  //   console.log(question_id)
  //   const choice_id = e.currentTarget.dataset.choice_id
  //   const user_id = wx.getStorageSync('userid')
  //   const newAnswer = {
  //     question_id,
  //     choice_id,
  //     user_id
  //   }
  //   apiClient.createAnswer({ data: newAnswer })

  //   const getOptions = {
  //     id:question_id,
  //     success: function (res) {
  //       const question = res.data.question_info
  //       page.setData({
  //         question
  //       })
  //     },
  //     fail: function (err) {
  //       console.log(err)
  //     }
  //   }

  //   apiClient.getQuestion(getOptions)
  // },

  toIndex: function() {
    wx.navigateTo({
      url: '../index/index',
    })
  },

})