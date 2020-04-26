import {Err, Opt} from '..'

export const traverseOpts: (p?: (opt?: Opt) => boolean) =>
                           (f?: (opt?: Opt, index?: number, opts?: Opt[]) => {errs?: Err[]; opts?: Opt[]}) =>
                           (obj?: {errs?: Err[]; opts?: Opt[]}) =>
                           {errs: Err[]; opts: Opt[]}