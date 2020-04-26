const {traverseArgv} = require('./traverseArgv')

const shortOptsNoSpace = traverseArgv(isShortOptionWithoutSpace)(arg => ({
  argv: [
    arg.slice(0, 2),
    arg.slice(2)
  ]
}))

module.exports = {
  shortOptsNoSpace
}

function isShortOptionWithoutSpace (arg) {
  return arg.length > 2 && arg[0] === '-' && arg[1] !== '-'
}