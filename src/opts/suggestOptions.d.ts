import {Err, Opt} from '..'

export const suggestOptions: (obj?: {errs?: Err[]; opts?: Opt[]}) => {errs: Err[]; opts: Opt[]}