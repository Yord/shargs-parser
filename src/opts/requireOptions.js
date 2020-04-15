const traverseOpts = require('./traverseOpts')
const {requiredOptionFormat, requiredOptionMissing} = require('../errors')

module.exports = traverseOpts(isRequired)(opt => {
  const errs = []

  const {key, values} = opt

  if (values === null || typeof values === 'undefined') {
    errs.push(requiredOptionMissing({key, option: opt}))
  } else if (!Array.isArray(values)) {
    errs.push(requiredOptionFormat({key, values, option: opt}))
  }

  return {errs}
})

function isRequired ({required}) {
  return required === true
}