const {traverseOpts} = require('./traverseOpts')
const {TypedVariable, Bool, ValidValuesTypes, Reverse} = require('../ducktypes')
const {is}   = require('../combinators/is')

const reverseBools = traverseOpts(is(TypedVariable, Bool, ValidValuesTypes, Reverse))(opt => {
  const values = []
  
  for (let i = 0; i < opt.types.length; i++) {
    const type  = opt.types[i]
    const val   = opt['values'][i]

    if (type === 'bool') {
      const value = val === 'false' ? 'true' : val === 'true' ? 'false' : typeof val === 'boolean' ? !val : val
      values.push(value)
    } else {
      values.push(val)
    }
  }

  return {opts: [{...opt, values}]}
})

module.exports = {
  reverseBools
}