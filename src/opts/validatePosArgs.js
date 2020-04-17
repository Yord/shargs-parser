const {invalidRequiredPositionalArgument, invalidVariadicPositionalArgument} = require('../errors')
const {PosArg, VariadicPosArg} = require('../ducktypes')
const is   = require('../combinators/is')
const pipe = require('../combinators/pipe')

module.exports = ({errs = [], opts = []} = {}) => {
  const posArgs = opts.filter(is(PosArg))

  return pipe(
    validateRequired(posArgs),
    validateVariadic(posArgs)
  )({errs, opts})
}

function validateRequired (posArgs) {
  return ({errs, opts}) => {
    const errs2 = []

    const invalidRequired = posArgs.reduce(
      (bool, {required = false}) => {
        if (required === false || required === true) {
          if (bool === null) {
            return required ? null : false
          } else {
            return bool || required
          }
        } else {
          return true
        }
      },
      null
    )

    if (invalidRequired === true) {
      errs2.push(invalidRequiredPositionalArgument({positionalArguments: posArgs}))
    }

    return ({errs: errs.concat(errs2), opts})
  }
}

function validateVariadic (posArgs) {
  return ({errs, opts}) => {
    const errs2 = []

    const invalidVariadic = posArgs.slice(0, posArgs.length - 1).reduce(
      (bool, opt) => bool || is(VariadicPosArg)(opt),
      false
    )
  
    if (invalidVariadic === true) {
      errs.push(invalidVariadicPositionalArgument({positionalArguments: posArgs}))
    }

    return {errs: errs.concat(errs2), opts}
  }
}