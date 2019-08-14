const baseUrl = "http://localhost:3000/api/v1/"

const getQuestions = (options) => {
  const { success, fail } = options

  return wx.request({
    url: baseUrl + "questions",
    method: "get",
    success,
    fail
  })
}

// this function is used on the result page, which would be like the same structure of each card on the index page.
const getResult = options => {
  const { id, success, fail } = options

  return wx.request({
    url: baseUrl + `questions/${id}`,
    method: "get",
    success,
    fail
  })
}

export default {
  getQuestions,
  getResult
}
