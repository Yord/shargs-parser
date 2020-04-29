import {Err, Opt} from '..'

export const suggestOpts: (obj?: {errs?: Err[]; opts?: Opt[]}) => {errs: Err[]; opts: Opt[]}