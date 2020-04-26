import {Args, Err} from '..'

export const clearRest: (obj?: {errs?: Err[]; args?: Args}) => {errs: Err[]; args: Args}