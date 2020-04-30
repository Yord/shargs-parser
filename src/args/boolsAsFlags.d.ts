import {Args, Err} from '..'

export const boolsAsFlags: (obj?: {errs?: Err[]; args?: Args}) => {errs: Err[]; args: Args}