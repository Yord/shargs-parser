import {Err, Opt} from '..'

export const bestGuessOpts: (obj?: {errs?: Err[]; opts?: Opt[]}) => {errs: Err[]; opts: Opt[]}