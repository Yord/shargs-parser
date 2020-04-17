const traverseOpts = require('./traverseOpts')
const {falseRules, wrongRulesType} = require('../errors')
const {Rules, Variable} = require('../ducktypes')
const is = require('../combinators/is')

module.exports = traverseOpts(is(Variable, Rules))((opt, _, opts) => {
  const errs = []

  const {key, rules} = opt

  if (validRules(opt)) {
    if (rules(opt)(opts) === false) {
      errs.push(falseRules({key, rules, option: opt}))
    }
  } else {
    errs.push(wrongRulesType({key, type: typeof rules, option: opt}))
  }

  return {errs}
})

function validRules ({rules}) {
  return typeof rules === 'function'
}