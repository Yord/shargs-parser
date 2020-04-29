import {Err, Opt} from '..'

export const requireOpts: (obj?: {errs?: Err[]; opts?: Opt[]}) => {errs: Err[]; opts: Opt[]}