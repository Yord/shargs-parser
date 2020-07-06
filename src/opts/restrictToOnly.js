const {traverseOpts} = require('./traverseOpts')
const {valueRestrictionsViolated} = require('../errors')
const {Only, Values, Variable} = require('../ducktypes')
const {is} = require('../combinators/is')

const restrictToOnly = traverseOpts(is(Variable, Values, Only))(opt => {
  const errs = []

  const {key, values, only} = opt

  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    
    if (only.indexOf(value) === -1) {
      errs.push(valueRestrictionsViolated({key, values, index: i, only, option: opt}))
    }
  }

  return {errs, opts: [opt]}
})

module.exports = {
  restrictToOnly
}