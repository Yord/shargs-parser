import {Err, Opt} from '..'

export const implyOpts: (obj?: {errs?: Err[]; opts?: Opt[]}) => {errs: Err[]; opts: Opt[]}