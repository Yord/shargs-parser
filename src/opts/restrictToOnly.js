const {traverseOpts} = require('./traverseOpts')
const {valueRestrictionsViolated} = require('../errors')
const {Only, Values, Variable} = require('../ducktypes')
const {is} = require('../combinators/is')

const restrictToOnly = traverseOpts(is(Variable, Values, Only))(opt => {
  const errs = []
  const opts = []

  const {key, values, only} = opt

  let correct = 0

  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    if (only.indexOf(value) > -1) {
      correct++
    } else {
      errs.push(valueRestrictionsViolated({key, values, index: i, only, option: opt}))
    }
  }

  if (values.length === correct) {
    opts.push(opt)
  } else {
    const {values, ...noValues} = opt
    opts.push(noValues)
  }

  return {errs, opts}
})

module.exports = {
  restrictToOnly
}