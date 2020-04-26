import {Args, Err} from '..'

interface Fs {
  array?:     (obj?: {key?: string; val?: any; errs?: Err[]; args?: Args}) => any
  boolean?:   (obj?: {key?: string; val?: any; errs?: Err[]; args?: Args}) => any
  flag?:      (obj?: {key?: string; val?: any; errs?: Err[]; args?: Args}) => any
  function?:  (obj?: {key?: string; val?: any; errs?: Err[]; args?: Args}) => any
  null?:      (obj?: {key?: string; val?: any; errs?: Err[]; args?: Args}) => any
  number?:    (obj?: {key?: string; val?: any; errs?: Err[]; args?: Args}) => any
  otherwise?: (obj?: {key?: string; val?: any; errs?: Err[]; args?: Args}) => any
  object?:    (obj?: {key?: string; val?: any; errs?: Err[]; args?: Args}) => any
  string?:    (obj?: {key?: string; val?: any; errs?: Err[]; args?: Args}) => any
  undefined?: (obj?: {key?: string; val?: any; errs?: Err[]; args?: Args}) => any
}

export const traverseArgs: (fs?: Fs) => (obj?: {errs?: Err[]; args?: Args}) => {errs: Err[]; args: Args}