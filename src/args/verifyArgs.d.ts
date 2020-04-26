import {Args, Err} from '..'

export const verifyArgs: (rules?: (args?: Args) => boolean) =>
                         (obj?: {errs?: Err[]; args?: Args}) =>
                         {errs: Err[]; args: Args}