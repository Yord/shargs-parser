const {commandRequired} = require('../errors')
const {CommandOption, ValuesOrDefaultValues} = require('../ducktypes')
const is = require('../combinators/is')

module.exports = ({errs = [], opts = []} = {}) => {
  const errs2 = []

  if (noCommandIn(opts)) {
    errs2.push(commandRequired({options: opts}))
  }

  return {errs: errs.concat(errs2), opts}
}

function noCommandIn (opts) {
  return !opts.some(is(CommandOption, ValuesOrDefaultValues))
}