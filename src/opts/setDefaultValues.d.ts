import {Err, Opt} from '..'

export const setDefaultValues: (obj?: {errs?: Err[]; opts?: Opt[]}) => {errs: Err[]; opts: Opt[]}