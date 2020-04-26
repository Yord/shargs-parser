const {traverseOpts} = require('./traverseOpts')
const {contradictionDetected, wrongContradictsType} = require('../errors')
const {Contradicts, ValuesOrDefaultValues, Variable} = require('../ducktypes')
const {is} = require('../combinators/is')

const contradictOpts = traverseOpts(is(Variable, Contradicts, ValuesOrDefaultValues))((opt, _, opts) => {
  const errs = []

  const {key, contradicts: keys} = opt

  if (Array.isArray(keys)) {
    if (opts.some(opt2 => keys.indexOf(opt2.key) > -1 && is(Variable, ValuesOrDefaultValues)(opt2))) {
      errs.push(contradictionDetected({key, contradicts: keys, option: opt}))
    }
  } else {
    errs.push(wrongContradictsType({key, type: typeof keys, option: opt}))
  }

  return {errs}
})

module.exports = {
  contradictOpts
}