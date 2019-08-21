const baseUrl = "https://ask-the-crowd.wogengapp.cn/api/v1/"
// const baseUrl = 'http://localhost:3000/api/v1/'

const getQuestions = (options) => {
  const { success, fail } = options

  return wx.request({
    url: baseUrl + "questions/",
    method: "get",
    success,
    fail
  })
}

const getMyresponses = (options) => {
  const { userid, success, fail } = options
  const user_id = wx.getStorageSync('userid')
  return wx.request({
    url: baseUrl + `questions/my_responses/${user_id}/`,
    method: "get",
    success,
    fail
  })
}

const getAskedquestions = (options) => {
  const { userid, success, fail } = options
  const user_id = wx.getStorageSync('userid')
  return wx.request({
    url: baseUrl + `questions/asked_questions/${user_id}/`,
    method: "get",
    success,
    fail
  })
}


const getQuestion = options => {
  const { id, success, fail } = options

  return wx.request({
    url: baseUrl + `questions/${id}/`,
    method: "get",
    success,
    fail
  })
}

const activateQuestion = options => {
  const { id, success, fail } = options

  return wx.request({
    url: baseUrl + `questions/${id}/`,
    method: "put",
    success,
    fail
  })
}


const createAnswer = options => {
  const { data, success, fail } = options

  return wx.request({
    url: baseUrl + "answers/",
    method: "post",
    data,
    success,
    fail
  })
}

const shareQuestion = options => {
  const { id, success, fail } = options

  return wx.request({
    url: baseUrl + `answers/${id}/`,
    method: "get",
    success,
    fail
  })
}

export default {
  getQuestions,
  createAnswer,
  shareQuestion,
  getQuestion,
  getAskedquestions,
  getMyresponses,
  activateQuestion
}
