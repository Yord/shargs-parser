import {Args, Err} from '..'

export const flagAsBool: (key?: string) => (obj?: {errs?: Err[]; args?: Args}) => {errs: Err[]; args: Args}