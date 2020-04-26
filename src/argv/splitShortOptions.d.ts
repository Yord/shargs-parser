import {Args, Err} from '..'

export const splitShortOptions: (obj?: {errs?: Err[]; argv?: string[]}) => {errs: Err[]; argv: string[]}