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
        // get the current list of questions
        // find the index of the updated question
        // replace the current data with the updated data
        // setData using the updated array
        const questions = page.data.questions
        questions.forEach(function (item, index) {
          console.log(22222, item)
          if(item.id === question.id) {
            question.photo = item.photo
            Object.assign(questions[index], question)
          }  
        });
        
        page.setData({
          questions
        })
      },
      fail: function (err) {
        console.log(err)
      }
       })

    console.log(e)
    const q = this.data.questions
    const new_qs1 = q.map(function (element) {
      // console.log(element)
        // console.log(111111, element.id == e.currentTarget.dataset.id)
        // console.log(element.id)
      // console.log(5555, e.currentTarget.dataset)
      if (element.id === e.currentTarget.dataset.id) {
        element.open = true
        element.percentage_one = Math.round(element.percentage_one)
        element.percentage_two = Math.round(element.percentage_two)
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
  bindViewTap: function() {
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
    } else if (this.data.canIUse){
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
      
      // this.setData({
      //   TabCur: app.globalData.TabCur
      // })
    }

    const page = this

    setTimeout(function () {
      page.setData({
        loading: true
      })
    }, 500)

    const options = {
      success: function (res) {
        console.log(res)
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

    // const q = page.data.questions
    // const new_qs = q.map(function (element) {
    //   element.photo = element.choice_info[0].photo || '/img/askthecrowd-default.jpeg'
    //   element.choice_text = element.choice_info[0].text || ''
    //   return element
    // })
    // this.setData({
    //   questions: new_qs
    // })
  },
  onShow: function () {
    // this.setData({
    //   TabCur: app.globalData.TabCur
    // })
    // const q = this.data.questions
    // const new_qs = q.map(function (element) {
    //   element.photo = element.choice_info[0].photo || '/img/askthecrowd-default.jpeg'
    //   element.choice_text = element.choice_info[0].text || ''
    //   return element
    // })
    // this.setData({
    //   questions: new_qs
    // })
  },
  getUserInfo: function(e) {
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
    apiClient.createAnswer({data:newAnswer})
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
    const q = page.data.questions
    console.log(q)
    const new_qs = q.map(function (element) {
      if (element.id == e.currentTarget.dataset.qid) {
        element.photo = e.currentTarget.dataset.url
        element.choice_text = e.currentTarget.dataset.text
        element.shadow = true
        element.shadow1 = false
        element.chosen = true
        // element.shadow = element.shadow != true
        // element.shadowfalse = false
        element.grow = true
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
    const q = this.data.questions
    console.log(q)
    const new_qs = q.map(function (element) {
      if (element.id == e.currentTarget.dataset.qid) {
        element.photo = e.currentTarget.dataset.url
        element.choice_text = e.currentTarget.dataset.text
        element.shadow1 = true
        element.shadow = false
        element.chosen = true
        
        // element.shadowfalse1 = false
        element.grow = true
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
  goToAsk () {
    wx.navigateTo({
      url: '/pages/asking-page/asking-page',
    })
  }
})
