import {Args, Err} from '..'

export const failRest: (obj?: {errs?: Err[]; args?: Args}) => {errs: Err[]; args: Args}