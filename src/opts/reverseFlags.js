const {traverseOpts} = require('./traverseOpts')
const {FlagOption, Reverse, ValidDefaultValuesTypes, ValidValuesTypes} = require('../ducktypes')
const {is}   = require('../combinators/is')
const {pipe} = require('../combinators/pipe')

const reverseFlags = pipe(
  reverseFlagsDomain('values', ValidValuesTypes),
  reverseFlagsDomain('defaultValues', ValidDefaultValuesTypes)
)

module.exports = {
  reverseFlags
}

function reverseFlagsDomain (val, Domain) {
  return traverseOpts(is(FlagOption, Domain, Reverse))(opt => ({
    opts: [
      {...opt, [val]: [-opt[val][0]]}
    ]
  }))
}