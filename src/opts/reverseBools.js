const traverseOpts = require('./traverseOpts')
const and = require('../combinators/and')

module.exports = traverseOpts(and(hasReverse, hasBool, hasValidValues))(opt => {
  const values = []
  
  for (let i = 0; i < opt.types.length; i++) {
    const type  = opt.types[i]
    const val   = opt.values[i]

    if (type === 'bool') {
      const value = val === 'false' ? 'true' : val === 'true' ? 'false' : typeof val === 'boolean' ? !val : val
      values.push(value)
    } else {
      values.push(val)
    }
  }

  return {opts: [{...opt, values}]}
})

function hasReverse ({reverse}) {
  return reverse === true
}

function hasBool ({types}) {
  return Array.isArray(types) && types.indexOf('bool') > -1
}

function hasValidValues ({types, values}) {
  return Array.isArray(values) && values.length > 0 && values.length === types.length
}