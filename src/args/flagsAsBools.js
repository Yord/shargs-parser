const {traverseArgs} = require('./traverseArgs')

const flagsAsBools = traverseArgs({
  flag: ({key, val, errs, args}) => ({
    errs,
    args: {...args, [key]: val.count > 0}
  })
})

module.exports = {
  flagsAsBools
}