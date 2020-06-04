const {traverseOpts} = require('./traverseOpts')
const {DefaultValues, Variable} = require('../ducktypes')
const {is} = require('../combinators/is')

const setDefaultValues = traverseOpts(is(Variable, DefaultValues))(opt => ({
  opts: [{
    ...opt,
    ...(typeof opt.values === 'undefined' ? {values: opt.defaultValues} : {})
  }]
}))

module.exports = {
  setDefaultValues
}