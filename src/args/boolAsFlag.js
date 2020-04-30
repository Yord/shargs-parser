const {traverseArgs} = require('./traverseArgs')

const boolAsFlag = key => traverseArgs({
  boolean: ({key: key2, val, errs, args}) => ({
    errs,
    args: key !== key2 ? args : {
      ...args,
      [key]: (
        val === true  ? {type: 'flag', count: 1}
                      : {type: 'flag', count: -1}
      )
    }
  })
})

module.exports = {
  boolAsFlag
}