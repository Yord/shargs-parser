import {Args, Err} from '..'

export const flagAsNumber: (key?: string) => (obj?: {errs?: Err[]; args?: Args}) => {errs: Err[]; args: Args}