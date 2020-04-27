const {arrayOnRepeat}     = require('./opts/arrayOnRepeat')
const {bestGuessArgs}     = require('./args/bestGuessArgs')
const {bestGuessCast}     = require('./args/bestGuessCast')
const {bestGuessOpts}     = require('./opts/bestGuessOpts')
const {broadenBools}      = require('./opts/broadenBools')
const {cast}              = require('./opts/cast')
const {clearRest}         = require('./args/clearRest')
const {contradictOpts}    = require('./opts/contradictOpts')
const {demandACommand}    = require('./opts/demandACommand')
const {equalsSignAsSpace} = require('./argv/equalsSignAsSpace')
const {failRest}          = require('./args/failRest')
const {flagAsBool}        = require('./args/flagAsBool')
const {flagAsNumber}      = require('./args/flagAsNumber')
const {flagsAsBools}      = require('./args/flagsAsBools')
const {flagsAsNumbers}    = require('./args/flagsAsNumbers')
const {implyOpts}         = require('./opts/implyOpts')
const {mergeArgs}         = require('./args/mergeArgs')
const {requireOptions}    = require('./opts/requireOptions')
const {restrictToOnly}    = require('./opts/restrictToOnly')
const {reverseBools}      = require('./opts/reverseBools')
const {reverseFlags}      = require('./opts/reverseFlags')
const {shortOptsNoSpace}  = require('./argv/shortOptsNoSpace')
const {splitShortOptions} = require('./argv/splitShortOptions')
const {suggestOptions}    = require('./opts/suggestOptions')
const {traverseArgs}      = require('./args/traverseArgs')
const {traverseArgv}      = require('./argv/traverseArgv')
const {traverseOpts}      = require('./opts/traverseOpts')
const {validatePosArgs}   = require('./opts/validatePosArgs')
const {verifyArgs}        = require('./args/verifyArgs')
const {verifyArgv}        = require('./argv/verifyArgv')
const {verifyOpts}        = require('./opts/verifyOpts')
const {verifyValuesArity} = require('./opts/verifyValuesArity')

module.exports = {
  arrayOnRepeat,
  bestGuessArgs,
  bestGuessCast,
  bestGuessOpts,
  broadenBools,
  cast,
  clearRest,
  contradictOpts,
  demandACommand,
  equalsSignAsSpace,
  failRest,
  flagAsBool,
  flagAsNumber,
  flagsAsBools,
  flagsAsNumbers,
  implyOpts,
  mergeArgs,
  requireOptions,
  restrictToOnly,
  reverseBools,
  reverseFlags,
  shortOptsNoSpace,
  splitShortOptions,
  suggestOptions,
  traverseArgs,
  traverseArgv,
  traverseOpts,
  validatePosArgs,
  verifyArgs,
  verifyArgv,
  verifyOpts,
  verifyValuesArity
}