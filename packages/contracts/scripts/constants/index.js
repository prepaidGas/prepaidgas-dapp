const executorConstatns = require("./executor.js")
const gasOrderConstatns = require("./gasOrder.js")
const testingConstatns = require("./testing.js")

module.exports = {
  ...executorConstatns,
  ...gasOrderConstatns,
  ...testingConstatns,
}
