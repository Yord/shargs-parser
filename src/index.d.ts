export {arrayOnRepeat}     from './opts/arrayOnRepeat'
export {bestGuessArgs}     from './args/bestGuessArgs'
export {bestGuessCast}     from './args/bestGuessCast'
export {bestGuessOpts}     from './opts/bestGuessOpts'
export {boolAsFlag}        from './opts/boolAsFlag'
export {boolsAsFlags}      from './opts/boolsAsFlags'
export {broadenBools}      from './opts/broadenBools'
export {cast}              from './opts/cast'
export {clearRest}         from './args/clearRest'
export {contradictOpts}    from './opts/contradictOpts'
export {demandASubcommand} from './opts/demandASubcommand'
export {equalsSignAsSpace} from './argv/equalsSignAsSpace'
export {failRest}          from './args/failRest'
export {flagAsBool}        from './args/flagAsBool'
export {flagAsNumber}      from './args/flagAsNumber'
export {flagsAsBools}      from './args/flagsAsBools'
export {flagsAsNumbers}    from './args/flagsAsNumbers'
export {implyOpts}         from './opts/implyOpts'
export {mergeArgs}         from './args/mergeArgs'
export {numberAsFlag}      from './args/numberAsFlag'
export {numbersAsFlags}    from './args/numbersAsFlags'
export {requireOpts}       from './opts/requireOpts'
export {restrictToOnly}    from './opts/restrictToOnly'
export {reverseBools}      from './opts/reverseBools'
export {reverseFlags}      from './opts/reverseFlags'
export {setDefaultValues}  from './opts/setDefaultValues'
export {shortOptsNoSpace}  from './argv/shortOptsNoSpace'
export {splitShortOpts}    from './argv/splitShortOpts'
export {suggestOpts}       from './opts/suggestOpts'
export {traverseArgs}      from './args/traverseArgs'
export {traverseArgv}      from './argv/traverseArgv'
export {traverseOpts}      from './opts/traverseOpts'
export {validatePosArgs}   from './opts/validatePosArgs'
export {verifyArgs}        from './args/verifyArgs'
export {verifyArgv}        from './argv/verifyArgv'
export {verifyOpts}        from './opts/verifyOpts'
export {verifyValuesArity} from './opts/verifyValuesArity'

export interface Err {
  code: string
  msg:  string
  info: object
}

export interface Args {
  _: string[]
  [key: string]: any
}

export interface Opt {
  args?: string[]
  contradicts?: string[],
  defaultValues?: any
  desc?: string
  descArg?: string
  implies?: string[]
  key?: string
  only?: any[]
  opts?: Opt[]
  required?: boolean
  reverse?: boolean
  rules?: (opt?: Opt) => (opts?: Opt[]) => boolean
  types?: string[]
  values?: any[]
  [key: string]: any
}