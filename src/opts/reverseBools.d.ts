import {Err, Opt} from '..'

export const reverseBools: (obj?: {errs?: Err[]; opts?: Opt[]}) => {errs: Err[]; opts: Opt[]}