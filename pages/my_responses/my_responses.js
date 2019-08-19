//index.js
import apiClient from "../../utils/apiClient.js"

const app = getApp()

Page({
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
      choice: 'A',
      choice_percent: '90',
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      choice: 'B',
      choice_percent: '10'
    },
    ],
    swiperList1: [{
      id: 0,
      type: 'image',
      url: '../../img/black-dress.jpg',
      choice: 'A',
      choice_percent: '45'
    }, {
      id: 1,
      type: 'image',
      url: '../../img/red-dress.jpg',
      choice: 'B',
      choice_percent: '55'
    },
    ],
    swiperList2: [{
      choice: 'A',
      percent: "70",
      text: 'Yes'
    },
    {
      choice: 'B',
      percent: '30',
      text: 'No'
    }
    ],
    percent: 50,
    navbaricon: [
      {
        title: "My questions",
        icon: "/icons/Question.png"
      },
      {
        title: "Public",
        icon: "/icons/svg_global.png"
      },
      {
        title: "Asked Questions",
        icon: "/icons/question-answer-line.png"
      }
    ],
    list: [{
      text: "My questions",
      iconPath: "/icons/Question.png",
      selectedIconPath: "",
    },
    {
      text: "Public",
      iconPath: "/icons/svg_global.png",
      selectedIconPath: "",
    },
    {
      text: "Asked Questions",
      iconPath: "/icons/question-answer-line.png",
      selectedIconPath: "",
    },
    ],
    TabCur: 1,
    scrollLeft: 0,
    active: "active"
  },
  tabChange(e) {
    console.log('tab change', e)
  },
  kindToggle: function (e) {
    // console.log(e)
    const q = this.data.questions
    const new_qs1 = q.map(function (element) {
      // console.log(element)
      console.log(111111, element.id == e.currentTarget.dataset.id)
      console.log(element.id)
      console.log(5555, e.currentTarget.dataset)
      if (element.id == e.currentTarget.dataset.id) {
        element.open = true

        return element
      } else {
        return element
      }
    })
    console.log(1111111, new_qs1)
    this.setData({
      questions: new_qs1
    });
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    const page = this
    const options = {
      success: function (res) {
        const questions = res.data.question_lists
        console.log(questions)

        page.setData({
          questions
        })
      },
      fail: function (err) {
        console.log(err)
      }
    }
    apiClient.getQuestions(options)

    wx.loadFontFace({
      family: 'Concert One',
      source: 'url("http://lc-qinkssxt.cn-n1.lcfile.com/d8eab2fdfbc672c39e71/ConcertOne-Regular.ttf")',
      success: console.log
    })
    wx.loadFontFace({
      family: 'BenMo',
      source: 'url("http://lc-qinkssxt.cn-n1.lcfile.com/74ad43d3a3b717fba000/BenMoYouYuan-2.ttf")',
      success: console.log
    })

  },
  onShow: function () {
    this.setData({
      TabCur: app.globalData.TabCur
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  tabSelect(e) {
    console.log(e)
    app.globalData.TabCur = e.currentTarget.dataset.id
    const TabCur = app.globalData.TabCur
    console.log(111111, TabCur)
    if (TabCur == 1) {
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else {
      if (TabCur == 0) {
        wx.switchTab({
          url: '/pages/my_responses/my_responses'
        })
      } else {
        wx.switchTab({
          url: '/pages/asked_questions/asked_questions'
        })
      }
    }
  },

  newAnswer: function (e) {
    const page = this
    const app = getApp()
    const question_id = e.currentTarget.dataset.id
    const choice_id = e.currentTarget.dataset.choice_id
    const user_id = wx.getStorageSync('userid')
    const newAnswer = {
      question_id,
      choice_id,
      user_id
    }
    apiClient.createAnswer({ data: newAnswer })

    const options = {
      success: function (res) {
        const questions = res.data.question_lists

        page.setData({
          questions
        })
      },
      fail: function (err) {
        console.log(err)
      }
    }
    apiClient.getQuestions(options)

  },
  SwitchImage1: function (e) {
    console.log(111111, e)
    // console.log(e.target.dataset.url)
    const q = this.data.questions
    const new_qs = q.map(function (element) {
      if (element.id == e.currentTarget.dataset.qid) {
        element.photo = e.currentTarget.dataset.url
        element.choice_text = e.currentTarget.dataset.text
        return element
      } else {
        return element
      }
    });
    console.log(new_qs)


    this.setData({
      questions: new_qs,
    })
  },
  SwitchImage2: function (e) {
    // console.log(e)
    // console.log(1111, page)
    const q = this.data.questions
    const new_qs = q.map(function (element) {
      if (element.id == e.currentTarget.dataset.qid) {
        element.photo = e.currentTarget.dataset.url
        element.choice_text = e.currentTarget.dataset.text
        return element
      } else {
        return element
      }
    });
    this.setData({
      questions: new_qs,
    })
  },
  choose: function (e) {
    this.setData({
      display: "display",
      active: ""
    })
  },
  goToAsk() {
    wx.navigateTo({
      url: '/pages/asking-page/asking-page',
    })
  }
})