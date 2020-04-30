const {traverseArgs} = require('./traverseArgs')

const boolsAsFlags = traverseArgs({
  boolean: ({key, val, errs, args}) => ({
    errs,
    args: {
      ...args,
      [key]: (
        val === true  ? {type: 'flag', count: 1}
                      : {type: 'flag', count: -1}
      )
    }
  })
})

module.exports = {
  boolsAsFlags
}