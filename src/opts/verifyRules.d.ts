import {Err, Opt} from '..'

export const verifyRules: (obj?: {errs?: Err[]; opts?: Opt[]}) => {errs: Err[]; opts: Opt[]}