const {traverseArgs} = require('./traverseArgs')

const numberAsFlag = key => traverseArgs({
  number: ({key: key2, val, errs, args}) => ({
    errs,
    args: key !== key2 ? args : {
      ...args,
      [key]: {type: 'flag', count: val}
    }
  })
})

module.exports = {
  numberAsFlag
}