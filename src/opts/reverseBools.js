const {traverseOpts} = require('./traverseOpts')
const {TypedVariable, Bool, ValidValuesTypes, ValidDefaultValuesTypes, Reverse} = require('../ducktypes')
const {is}   = require('../combinators/is')
const {pipe} = require('../combinators/pipe')

const reverseBools = pipe(
  reverseBoolsDomain('values', ValidValuesTypes),
  reverseBoolsDomain('defaultValues', ValidDefaultValuesTypes)
)

module.exports = {
  reverseBools
}

function reverseBoolsDomain (kind, Domain) {
  return traverseOpts(is(TypedVariable, Bool, Domain, Reverse))(opt => {
    const values = []
    
    for (let i = 0; i < opt.types.length; i++) {
      const type  = opt.types[i]
      const val   = opt[kind][i]
  
      if (type === 'bool') {
        const value = val === 'false' ? 'true' : val === 'true' ? 'false' : typeof val === 'boolean' ? !val : val
        values.push(value)
      } else {
        values.push(val)
      }
    }
  
    return {opts: [{...opt, [kind]: values}]}
  })
}