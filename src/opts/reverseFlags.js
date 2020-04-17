const traverseOpts = require('./traverseOpts')
const {FlagOption, Reverse, ValidDefaultValuesTypes, ValidValuesTypes} = require('../ducktypes')
const is   = require('../combinators/is')
const pipe = require('../combinators/pipe')

module.exports = pipe(
  reverseFlags('values', ValidValuesTypes),
  reverseFlags('defaultValues', ValidDefaultValuesTypes)
)

function reverseFlags (val, Domain) {
  return traverseOpts(is(FlagOption, Domain, Reverse))(opt => ({
    opts: [
      {...opt, [val]: [-opt[val][0]]}
    ]
  }))
}