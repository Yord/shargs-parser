import {Args, Err} from '..'

export const verifyArgv: (rules?: (argv?: string[]) => boolean) =>
                         (obj?: {errs?: Err[]; argv?: string[]}) =>
                         {errs: Err[]; argv: string[]}