import {Err, Opt} from '..'

export const verifyOpts: (rules?: (opts?: Opt[]) => boolean) =>
                         (obj?: {errs?: Err[]; opts?: Opt[]}) =>
                         {errs: Err[]; opts: Opt[]}