function traverseArgs (fs = {}) {
  return ({errs = [], args = {_: []}} = {}) => {
    const {
      array:     arrayF     = id,
      boolean:   booleanF   = id,
      flag:      flagF      = id,
      function:  functionF  = id,
      null:      nullF      = id,
      number:    numberF    = id,
      otherwise: otherwiseF = rm,
      object:    objectF    = null,
      string:    stringF    = id,
      undefined: undefinedF = id
    } = fs
  
    return Object.keys(args).reduce(
      ({errs: errs2, args: args2}, arg) => {
        const val = args2[arg]
        if (typeof val      === 'undefined')             return undefinedF({key: arg, val, errs: errs2, args: args2})
        else if (val        === null)                    return nullF({key: arg, val, errs: errs2, args: args2})
        else if (typeof val === 'boolean')               return booleanF({key: arg, val, errs: errs2, args: args2})
        else if (typeof val === 'number')                return numberF({key: arg, val, errs: errs2, args: args2})
        else if (typeof val === 'string')                return stringF({key: arg, val, errs: errs2, args: args2})
        else if (Array.isArray(val))                     return arrayF({key: arg, val, errs: errs2, args: args2})
        else if (typeof val === 'object' && isFlag(val)) return flagF({key: arg, val, errs: errs2, args: args2})
        else if (typeof val === 'object') {
          if (objectF === null) {
            const {errs: errs3, args: args3} = traverseArgs(fs)({args: val})
            return {
              errs: errs2.concat(errs3),
              args: {...args2, [arg]: args3}
            }
          } else {
            return objectF({key: arg, val, errs: errs2, args: args2})
          }
        }
        else if (typeof val === 'function')              return functionF({key: arg, val, errs: errs2, args: args2})
        else                                             return otherwiseF({key: arg, val, errs: errs2, args: args2})
      },
      {errs, args}
    )
  }
}

module.exports = {
  traverseArgs
}

function id ({errs, args}) {
  return {errs, args}
}

function rm ({key, errs, args}) {
  const {[key]: f, ...rest} = args
  return {errs, args: rest}
}

function isFlag ({type, count}) {
  return type === 'flag' && typeof count === 'number'
}