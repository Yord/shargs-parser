const traverseOpts = require('./traverseOpts')

module.exports = traverseOpts(hasArrayField)(commandAsArray)

function commandAsArray (opt) {
  const {defaultValues, values} = opt

  if (Array.isArray(values) || Array.isArray(defaultValues)) {
    const length = (Array.isArray(values) ? values : defaultValues).length
    const types  = Array.from({length}, () => 'string')
  
    return {
      opts: [{...opt, types}]
    }
  } else {
    return {
      opts: [{...opt, defaultValues: []}]
    }
  }
}

function hasArrayField ({array}) {
  return array === true
}