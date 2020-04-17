const {incompatibleTypes} = require('../errors')
const {CommandOption, FlagOption, Variable, Variadic} = require('../ducktypes')
const and = require('../combinators/and')
const is = require('../combinators/is')
const not = require('../combinators/not')

module.exports = ({errs = [], opts = []} = {}) => {
  const errs2 = []
  const opts2 = []

  const keysIndex = {}

  for (let i = 0; i < opts.length; i++) {
    const opt = opts[i]

    if (and(is(Variable), not(is(CommandOption)), not(is(FlagOption)))(opt)) {
      const {key, types, values} = opt

      if (typeof keysIndex[key] === 'undefined') {
        opts2.push(opt)
        keysIndex[key] = opts2.length - 1
      } else {
        const prev = opts2[keysIndex[key]]

        if (is(Variadic)(opt)) {
          if (is(Variadic)(prev)) {
            opts2[keysIndex[key]] = {
              ...prev,
              values: [...prev.values, ...values]
            }
          } else {
            opts2.push(opt)
            errs.push(incompatibleTypes({opts: [prev, opt]}))
          }
        } else {
          if (is(Variadic)(prev)) {
            opts2.push(opt)
            errs.push(incompatibleTypes({opts: [prev, opt]}))
          } else {
            opts2[keysIndex[key]] = {
              ...prev,
              types: [...prev.types, ...types],
              values: [...prev.values, ...values]
            }
          }
        }
      }
    } else {
      opts2.push(opt)
    }
  }

  return {errs: errs.concat(errs2), opts: opts2}
}