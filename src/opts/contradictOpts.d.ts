import {Err, Opt} from '..'

export const contradictOpts: (obj?: {errs?: Err[]; opts?: Opt[]}) => {errs: Err[]; opts: Opt[]}