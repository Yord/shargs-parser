const {traverseOpts} = require('./traverseOpts')
const {implicationViolated, wrongImpliesType} = require('../errors')
const {Implies, Values, Variable} = require('../ducktypes')
const {is} = require('../combinators/is')

const implyOpts = traverseOpts(is(Variable, Implies, Values))((opt, _, opts) => {
  const errs = []

  const {key, implies: keys} = opt

  if (Array.isArray(keys)) {
    if (!opts.every(opt2 => keys.indexOf(opt2.key) === -1 || is(Variable, Values)(opt2))) {
      errs.push(implicationViolated({key, implies: keys, option: opt}))
    }
  } else {
    errs.push(wrongImpliesType({key, type: typeof keys, option: opt}))
  }

  return {errs}
})

module.exports = {
  implyOpts
}