const traverseOpts = require('./traverseOpts')
const {implicationViolated, wrongImpliesType} = require('../errors')
const {Implies, ValuesOrDefaultValues, Variable} = require('../ducktypes')
const is = require('../combinators/is')

module.exports = traverseOpts(is(Variable, Implies, ValuesOrDefaultValues))((opt, _, opts) => {
  const errs = []

  const {key, implies: keys} = opt

  if (Array.isArray(keys)) {
    if (!opts.every(opt2 => keys.indexOf(opt2.key) === -1 || is(Variable, ValuesOrDefaultValues)(opt2))) {
      errs.push(implicationViolated({key, implies: keys, option: opt}))
    }
  } else {
    errs.push(wrongImpliesType({key, type: typeof keys, option: opt}))
  }

  return {errs}
})