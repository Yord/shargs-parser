import {Args, Err} from '..'

export const bestGuessArgs: (obj?: {errs?: Err[]; args?: Args}) => {errs: Err[]; args: Args}