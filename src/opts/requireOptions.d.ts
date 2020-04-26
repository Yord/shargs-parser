import {Err, Opt} from '..'

export const requireOptions: (obj?: {errs?: Err[]; opts?: Opt[]}) => {errs: Err[]; opts: Opt[]}