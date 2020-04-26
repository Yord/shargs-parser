const {traverseArgs} = require('./traverseArgs')

const flagAsBool = key => traverseArgs({
  flag: ({key: key2, val, errs, args}) => ({
    errs,
    args: key === key2 ? {...args, [key]: val.count > 0} : args
  })
})

module.exports = {
  flagAsBool
}