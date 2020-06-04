const {traverseOpts} = require('./traverseOpts')
const {invalidArity, invalidTypes, invalidValues} = require('../errors')
const {is}   = require('../combinators/is')
const {ArrayVariable, FlagOption, PrimitiveVariable, Unnamed, VariadicVariable} = require('../ducktypes')

const verifyValuesArity = traverseOpts(hasValues)(opt => {
  const errs = []

  const {types, values} = opt

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
      if (values.length !== 1) {
        errs.push(invalidArity({types, option: opt}))
      } else if (typeof values[0] !== 'string') {
        errs.push(invalidValues({values, option: opt}))
      }
    } else if (!is(VariadicVariable)(opt)) {
      errs.push(invalidTypes({types, option: opt}))
    }
  } else {
    errs.push(invalidValues({values, option: opt}))
  }

  return {errs}
})

module.exports = {
  verifyValuesArity
}

function hasValues ({values} = {values: undefined}) {
  return typeof values !== 'undefined' && values !== null
}