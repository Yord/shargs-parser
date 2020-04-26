import {Err, Opt} from '..'

export const demandACommand: (obj?: {errs?: Err[]; opts?: Opt[]}) => {errs: Err[]; opts: Opt[]}