const {Rest} = require('../ducktypes')
const is = require('../combinators/is')

module.exports = ({errs = [], opts = []} = {}) => {
  const errs2 = []
  const opts2 = []

  let at  = 0
  let opt = opts[at]

  while (opt) {
    if (is(Rest)(opt) && isOption(opt.values[0])) {
      const arg = opt.values[0]
      const key = arg.slice(isShortOption(arg) ? 1 : 2)

      if (keyIsNotDefined(key, opts)) {
        const opt2 = opts[at + 1]

        if (opt2 && is(Rest)(opt2)) {
          const arg = opt2.values[0]

          if (isValue(arg)) {
            const str = {key, types: ['string'], values: opt2.values}
            opts2.push(str)
            at += 1
          } else {
            const flg = {key, types: [], args: [], values: [1]}
            opts2.push(flg)
          }
        } else {
          const flg = {key, types: [], args: [], values: [1]}
          opts2.push(flg)
        }
      } else opts2.push(opt)
    } else opts2.push(opt)

    at += 1
    opt = opts[at]
  }

  return {errs: errs.concat(errs2), opts: opts2}
}

function keyIsNotDefined (key2, opts) {
  return !opts.some(({key}) => key === key2)
}

function isOption (arg) {
  return isLongOption(arg) || isShortOption(arg)
}

function isShortOption (arg) {
  return arg.length === 2 && arg[0] === '-' && arg[1] !== '-'
}

function isLongOption (arg) {
  return arg.length > 2 && arg[0] === '-' && arg[1] === '-' && arg[2] !== '-'
}

function isValue (arg) {
  return arg.length > 0 && arg[0] !== '-'
}