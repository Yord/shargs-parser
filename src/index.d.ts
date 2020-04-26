export {arrayOnRepeat}     from './opts/arrayOnRepeat'
export {bestGuessArgs}     from './args/bestGuessArgs'
export {bestGuessCast}     from './args/bestGuessCast'
export {bestGuessOpts}     from './opts/bestGuessOpts'
export {broadenBools}      from './opts/broadenBools'
export {cast}              from './opts/cast'
export {clearRest}         from './args/clearRest'
export {contradictOpts}    from './opts/contradictOpts'
export {demandACommand}    from './opts/demandACommand'
export {equalsSignAsSpace} from './argv/equalsSignAsSpace'
export {failRest}          from './args/failRest'
export {flagAsBool}        from './args/flagAsBool'
export {flagAsNumber}      from './args/flagAsNumber'
export {flagsAsBools}      from './args/flagsAsBools'
export {flagsAsNumbers}    from './args/flagsAsNumbers'
export {implyOpts}         from './opts/implyOpts'
export {mergeArgs}         from './args/mergeArgs'
export {requireOptions}    from './opts/requireOptions'
export {restrictToOnly}    from './opts/restrictToOnly'
export {reverseBools}      from './opts/reverseBools'
export {reverseFlags}      from './opts/reverseFlags'
export {shortOptsNoSpace}  from './argv/shortOptsNoSpace'
export {splitShortOptions} from './argv/splitShortOptions'
export {suggestOptions}    from './opts/suggestOptions'
export {traverseArgs}      from './args/traverseArgs'
export {traverseArgv}      from './argv/traverseArgv'
export {traverseOpts}      from './opts/traverseOpts'
export {validatePosArgs}   from './opts/validatePosArgs'
export {verifyArgs}        from './args/verifyArgs'
export {verifyArgv}        from './argv/verifyArgv'
export {verifyOpts}        from './opts/verifyOpts'
export {verifyRules}       from './opts/verifyRules'
export {verifyValuesArity} from './opts/verifyValuesArity'

export interface Err {
  code: string
  msg:  string
  info: object
}

export interface Args {
  _: any[]
  [key: string]: any
}