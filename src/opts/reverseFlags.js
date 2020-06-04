const {traverseOpts} = require('./traverseOpts')
const {FlagOption, Reverse, ValidValuesTypes} = require('../ducktypes')
const {is}   = require('../combinators/is')

const reverseFlags = traverseOpts(is(FlagOption, ValidValuesTypes, Reverse))(opt => ({
  opts: [
    {...opt, values: [-opt['values'][0]]}
  ]
}))

module.exports = {
  reverseFlags
}