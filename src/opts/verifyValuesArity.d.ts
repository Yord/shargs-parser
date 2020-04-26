import {Err, Opt} from '..'

export const verifyValuesArity: (obj?: {errs?: Err[]; opts?: Opt[]}) => {errs: Err[]; opts: Opt[]}