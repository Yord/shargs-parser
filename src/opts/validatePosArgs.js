const {invalidRequiredPositionalArgument, invalidVariadicPositionalArgument} = require('../errors')
const pipe = require('../combinators/pipe')

module.exports = ({errs = [], opts = []} = {}) => {
  const posArgs = opts.filter(isPosArg)

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
      (bool, opt) => bool || isVariadicPosArg(opt),
      false
    )
  
    if (invalidVariadic === true) {
      errs.push(invalidVariadicPositionalArgument({positionalArguments: posArgs}))
    }

    return {errs: errs.concat(errs2), opts}
  }
}

function isPosArg (opt) {
  return hasKey(opt) && !hasArgs(opt)
}

function isVariadicPosArg (opt) {
  return isPosArg(opt) && !hasTypes(opt)
}

function hasArgs ({args}) {
  return Array.isArray(args)
}

function hasTypes ({types}) {
  return Array.isArray(types)
}

function hasKey ({key}) {
  return typeof key === 'string'
}