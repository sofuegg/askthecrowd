
// pages/asked_questions/asked_questions.js
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
        title: "My Responses",
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
      text: "My Responses",
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
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  SetColor(e) {
    this.setData({
      color: e.currentTarget.dataset.color,
      modalName: null
    })
  },
  SetActive(e) {
    this.setData({
      active: e.detail.value
    })
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
       const user_id = wx.getStorageSync('userid')
       console.log(user_id)
       const options = {
       userid: {user_id},
      success: function (res) {
        const questions = res.data.question_lists     
        console.log(11111, questions)
        const statsRoundedQs = questions.map(function (element){
          Math.round(element.percentage_one)
          Math.round(element.percentage_two)
          return element
        })
        console.log(questions)
         page.setData({
           questions: statsRoundedQs
         })
      }, 
      fail: function (err) {
        console.log(err)
      }
    }
    apiClient.getAskedquestions(options)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */

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
   
  onShow: function () {
    this.setData({
      TabCur: app.globalData.TabCur
    })
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
    apiClient.getAskedquestions(options)
    setTimeout(function () {
      page.setData({
        loading: true
      })
    }, 500)
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

 
  SwitchImage1: function (e) {
    console.log(111111, e)
    // console.log(e.target.dataset.url)
    const q = this.data.questions
    const new_qs = q.map(function (element) {
      if (element.id == e.currentTarget.dataset.qid) {
        element.photo = e.currentTarget.dataset.url
        element.choice_text = e.currentTarget.dataset.text
        element.shadow = true
        element.shadow1 = false
        return element
      } else {
        return element
      }
    });
    console.log(new_qs)


    this.setData({
      questions: new_qs,
      toggleactive1: 'active',
      toggleactive2: ''
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
        element.shadow1 = true
        element.shadow = false
        return element
      } else {
        return element
      }
    });
    this.setData({
      questions: new_qs,
      toggleactive1: '',
      toggleactive2: 'active'
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