// pages/new-home-page-test/new-home-page-test.js
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
    ]

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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
    this.setData({

      imageurl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"
    })
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

  SwitchImage1: function (e) {
    this.setData({
      toggleactive1: "active",
      toggleactive2:"",
      imageurl:     "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"
    })
  },

SwitchImage2: function (e) {
    this.setData({
      toggleactive1: "",
      toggleactive2: "active",
      imageurl: "https://m.media-amazon.com/images/M/MV5BZTJmMTIxNDMtMDY5Mi00YjYzLThiZjgtODM5NzdiZDIwNWJmXkEyXkFqcGdeQXVyODEwMTc2ODQ@._V1_UY268_CR146,0,182,268_AL_.jpg;"
    })
  }
})