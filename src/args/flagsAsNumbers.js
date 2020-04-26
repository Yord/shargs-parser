const {traverseArgs} = require('./traverseArgs')

const flagsAsNumbers = traverseArgs({
  flag: ({key, val, errs, args}) => ({
    errs,
    args: {...args, [key]: val.count}
  })
})

module.exports = {
  flagsAsNumbers
}