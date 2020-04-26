const {traverseOpts} = require('./traverseOpts')
const {invalidArity, invalidTypes, invalidValues} = require('../errors')
const {is}   = require('../combinators/is')
const {pipe} = require('../combinators/pipe')
const {ArrayVariable, FlagOption, PrimitiveVariable, Unnamed, VariadicVariable} = require('../ducktypes')

const verifyValuesArity = pipe(
  checkArity('values'),
  checkArity('defaultValues')
)

module.exports = {
  verifyValuesArity
}

function checkArity (key) {
  return traverseOpts(hasValues(key))(opt => {
    const errs = []

    const {types, [key]: values} = opt

    if (Array.isArray(values)) {
      if (is(PrimitiveVariable)(opt)) {
        if (values.length !== 1) {
          errs.push(invalidArity({option: opt}))
        }
      } else if (is(FlagOption)(opt)) {
        if (values.length !== 1) {
          errs.push(invalidArity({option: opt}))
        }
      } else if (is(ArrayVariable)(opt)) {
        if (values.length < 2) {
          errs.push(invalidArity({option: opt}))
        }
      } else if (is(Unnamed)(opt)) {
        if (key === 'defaultValues') {
          errs.push(invalidValues({[key]: values, option: opt}))
        } else if (values.length !== 1) {
          errs.push(invalidArity({types, option: opt}))
        } else if (typeof values[0] !== 'string') {
          errs.push(invalidValues({[key]: values, option: opt}))
        }
      } else if (!is(VariadicVariable)(opt)) {
        errs.push(invalidTypes({types, option: opt}))
      }
    } else {
      errs.push(invalidValues({[key]: values, option: opt}))
    }

    return {errs}
  })
}

function hasValues (key) {
  return (opt = {}) => {
    const {[key]: values} = opt
    return typeof values !== 'undefined' && values !== null
  }
}