import {Args, Err} from '..'

export const flagsAsBools: (obj?: {errs?: Err[]; args?: Args}) => {errs: Err[]; args: Args}