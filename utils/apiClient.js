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

export default {
  getQuestions
}
