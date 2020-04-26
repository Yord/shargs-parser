import {Args, Err} from '..'

export const flagsAsNumbers: (obj?: {errs?: Err[]; args?: Args}) => {errs: Err[]; args: Args}