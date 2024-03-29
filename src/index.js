const {arrayOnRepeat}     = require('./opts/arrayOnRepeat')
const {bestGuessArgs}     = require('./args/bestGuessArgs')
const {bestGuessCast}     = require('./args/bestGuessCast')
const {bestGuessOpts}     = require('./opts/bestGuessOpts')
const {boolAsFlag}        = require('./args/boolAsFlag')
const {boolsAsFlags}      = require('./args/boolsAsFlags')
const {broadenBools}      = require('./opts/broadenBools')
const {cast}              = require('./opts/cast')
const {clearRest}         = require('./args/clearRest')
const {contradictOpts}    = require('./opts/contradictOpts')
const {demandASubcommand} = require('./opts/demandASubcommand')
const {equalsSignAsSpace} = require('./argv/equalsSignAsSpace')
const {failRest}          = require('./args/failRest')
const {flagAsBool}        = require('./args/flagAsBool')
const {flagAsNumber}      = require('./args/flagAsNumber')
const {flagsAsBools}      = require('./args/flagsAsBools')
const {flagsAsNumbers}    = require('./args/flagsAsNumbers')
const {implyOpts}         = require('./opts/implyOpts')
const {mergeArgs}         = require('./args/mergeArgs')
const {numberAsFlag}      = require('./args/numberAsFlag')
const {numbersAsFlags}    = require('./args/numbersAsFlags')
const {requireOpts}       = require('./opts/requireOpts')
const {restrictToOnly}    = require('./opts/restrictToOnly')
const {reverseBools}      = require('./opts/reverseBools')
const {reverseFlags}      = require('./opts/reverseFlags')
const {setDefaultValues}  = require('./opts/setDefaultValues')
const {shortOptsNoSpace}  = require('./argv/shortOptsNoSpace')
const {splitShortOpts}    = require('./argv/splitShortOpts')
const {suggestOpts}       = require('./opts/suggestOpts')
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
  boolAsFlag,
  boolsAsFlags,
  broadenBools,
  cast,
  clearRest,
  contradictOpts,
  demandASubcommand,
  equalsSignAsSpace,
  failRest,
  flagAsBool,
  flagAsNumber,
  flagsAsBools,
  flagsAsNumbers,
  implyOpts,
  mergeArgs,
  numberAsFlag,
  numbersAsFlags,
  requireOpts,
  restrictToOnly,
  reverseBools,
  reverseFlags,
  setDefaultValues,
  shortOptsNoSpace,
  splitShortOpts,
  suggestOpts,
  traverseArgs,
  traverseArgv,
  traverseOpts,
  validatePosArgs,
  verifyArgs,
  verifyArgv,
  verifyOpts,
  verifyValuesArity
}