import {Err, Opt} from '..'

export const reverseFlags: (obj?: {errs?: Err[]; opts?: Opt[]}) => {errs: Err[]; opts: Opt[]}