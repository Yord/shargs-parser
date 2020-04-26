import {Args, Err} from '..'

export const mergeArgs: (merge?: (args1?: Args, args2?: Args) => Args) => (obj?: {errs?: Err[]; args?: Args}) => {errs: Err[]; args: Args}