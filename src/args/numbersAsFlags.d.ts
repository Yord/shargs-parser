import {Args, Err} from '..'

export const numbersAsFlags: (obj?: {errs?: Err[]; args?: Args}) => {errs: Err[]; args: Args}