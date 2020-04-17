const traverseOpts = require('./traverseOpts')
const {argumentIsNotABool, argumentIsNotANumber} = require('../errors')
const {TypedVariable, ValidDefaultValuesTypes, ValidValuesTypes} = require('../ducktypes')
const compose = require('../combinators/compose')
const is      = require('../combinators/is')
const pipe    = require('../combinators/pipe')

module.exports = pipe(
  cast(ValidValuesTypes)('values'),
  cast(ValidDefaultValuesTypes)('defaultValues')
)

function cast (Domain) {
  return compose(traverseOpts(is(TypedVariable, Domain)), castKey)
}

function castKey (val) {
  return opt => {
    const errs  = []
    const opts = []
  
    const {[val]: values, types} = opt
  
    let values2 = []
  
    for (let j = 0; j < types.length; j++) {
      const type  = types[j]
      const value = values[j]
      switch (type) {
        case 'string':
          values2.push(value)
          break
        case 'number':
          const float = parseFloat(value)
          if (!Number.isNaN(float)) values2.push(float)
          else errs.push(argumentIsNotANumber({[val]: values, index: j, option: opt}))
          break
        case 'bool':
          if (value === 'true' || value === true)        values2.push(true)
          else if (value === 'false' || value === false) values2.push(false)
          else errs.push(argumentIsNotABool({[val]: values, index: j, option: opt}))
          break
        default:
          values2.push(value)
          break
      }
    }
    opts.push({...opt, ...(values2.length === 0 ? {} : {[val]: values2})})
  
    return {errs, opts}
  }
}