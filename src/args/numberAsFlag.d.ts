import {Args, Err} from '..'

export const numberAsFlag: (key?: string) => (obj?: {errs?: Err[]; args?: Args}) => {errs: Err[]; args: Args}