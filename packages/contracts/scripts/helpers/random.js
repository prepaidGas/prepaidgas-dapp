function randomNumber(max) {
  return Math.floor(Math.random() * max)
}
function randomBytes(length) {
  let b = "0x"
  for (let i = 0; i < 2 * length; i++) b += randomNumber(16).toString(16)
  return b
}

module.exports = { randomNumber, randomBytes }
