import {Args, Err} from '..'

export const boolAsFlag: (key?: string) => (obj?: {errs?: Err[]; args?: Args}) => {errs: Err[]; args: Args}