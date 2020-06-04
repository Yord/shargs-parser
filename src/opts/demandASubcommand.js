const {subcommandRequired} = require('../errors')
const {CommandOption, Values} = require('../ducktypes')
const {is} = require('../combinators/is')

const demandASubcommand = ({errs = [], opts = []} = {}) => {
  const errs2 = []

  if (noSubcommandIn(opts)) {
    errs2.push(subcommandRequired({options: opts}))
  }

  return {errs: errs.concat(errs2), opts}
}

module.exports = {
  demandASubcommand
}

function noSubcommandIn (opts) {
  return !opts.some(is(CommandOption, Values))
}