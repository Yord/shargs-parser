const {falseArgvRules, wrongArgvRulesType} = require('../errors')

const verifyArgv = (rules = argv => true) => ({errs = [], argv = []} = {}) => {
  const errs2 = []

  if (typeof rules === 'function') {
    if (rules(argv) === false) {
      errs2.push(falseArgvRules({rules, argv}))
    }
  } else {
    errs2.push(wrongArgvRulesType({type: typeof rules, argv}))
  }

  return {errs: errs.concat(errs2), argv}
}

module.exports = {
  verifyArgv
}