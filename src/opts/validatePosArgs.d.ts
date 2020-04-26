import {Err, Opt} from '..'

export const validatePosArgs: (obj?: {errs?: Err[]; opts?: Opt[]}) => {errs: Err[]; opts: Opt[]}