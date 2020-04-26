import {Err, Opt} from '..'

export const broadenBools: (alt?: {true?: string[], false?: string[]}) =>
                           (obj?: {errs?: Err[]; opts?: Opt[]}) =>
                           {errs: Err[]; opts: Opt[]}