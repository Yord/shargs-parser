const {traverseOpts} = require('./traverseOpts')
const {requiredOptionFormat, requiredOptionMissing} = require('../errors')
const {Required, Variable} = require('../ducktypes')
const {is}  = require('../combinators/is')
const {not} = require('../combinators/not')

const requireOpts = traverseOpts(is(Variable, Required))(opt => {
  const errs = []

  const {key, values} = opt

  if (isNotDefined(values)) {
    errs.push(requiredOptionMissing({key, option: opt}))
  } else if (isDefined(values) && isNotArray(values)) {
    errs.push(requiredOptionFormat({key, values, option: opt}))
  }

  return {errs}
})

module.exports = {
  requireOpts
}

const isDefined = val => typeof val !== 'undefined' && val !== null

const isNotDefined = not(isDefined)

const isNotArray = val => !Array.isArray(val)