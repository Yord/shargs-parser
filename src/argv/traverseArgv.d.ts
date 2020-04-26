import {Args, Err} from '..'

export const traverseArgv: (p?: (arg?: string) => boolean) =>
                           (f?: (arg?: string, index?: number, argv?: string[]) => {errs?: Err[]; argv?: string[]}) =>
                           (obj?: {errs?: Err[]; argv?: string[]}) =>
                           {errs: Err[]; argv: string[]}