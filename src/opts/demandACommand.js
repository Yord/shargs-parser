const {commandRequired} = require('../errors')
const {CommandOption, Values} = require('../ducktypes')
const {is} = require('../combinators/is')

const demandACommand = ({errs = [], opts = []} = {}) => {
  const errs2 = []

  if (noCommandIn(opts)) {
    errs2.push(commandRequired({options: opts}))
  }

  return {errs: errs.concat(errs2), opts}
}

module.exports = {
  demandACommand
}

function noCommandIn (opts) {
  return !opts.some(is(CommandOption, Values))
}