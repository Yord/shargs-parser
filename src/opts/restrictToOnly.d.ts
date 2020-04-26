import {Err, Opt} from '..'

export const restrictToOnly: (obj?: {errs?: Err[]; opts?: Opt[]}) => {errs: Err[]; opts: Opt[]}