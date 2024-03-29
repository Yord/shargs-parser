const {traverseArgv} = require('./traverseArgv')
const {and}          = require('../combinators/and')

const equalsSignAsSpace = traverseArgv(and(isLongOption, hasEqualsSign))(arg => ({
  argv: [
    arg.slice(0, arg.indexOf('=')),
    arg.slice(arg.indexOf('=') + 1)
  ]
}))

module.exports = {
  equalsSignAsSpace
}

function hasEqualsSign (arg) {
  return arg.indexOf('=') > -1
}

function isLongOption (arg) {
  return arg.length > 2 && arg.slice(0, 2) === '--' && arg[2] !== '-'
}