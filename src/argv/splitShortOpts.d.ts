import {Args, Err} from '..'

export const splitShortOpts: (obj?: {errs?: Err[]; argv?: string[]}) => {errs: Err[]; argv: string[]}