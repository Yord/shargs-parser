import {Args, Err} from '..'

export const bestGuessCast: (obj?: {errs?: Err[]; args?: Args}) => {errs: Err[]; args: Args}