import {Err, Opt} from '..'

export const demandASubcommand: (obj?: {errs?: Err[]; opts?: Opt[]}) => {errs: Err[]; opts: Opt[]}