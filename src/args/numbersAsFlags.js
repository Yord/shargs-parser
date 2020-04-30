const {traverseArgs} = require('./traverseArgs')

const numbersAsFlags =traverseArgs({
  number: ({key, val, errs, args}) => ({
    errs,
    args: {
      ...args,
      [key]: {type: 'flag', count: val}
    }
  })
})

module.exports = {
  numbersAsFlags
}