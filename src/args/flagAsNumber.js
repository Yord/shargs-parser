const {traverseArgs} = require('./traverseArgs')

const flagAsNumber = key => traverseArgs({
  flag: ({key: key2, val, errs, args}) => ({
    errs,
    args: key === key2 ? {...args, [key]: val.count} : args
  })
})

module.exports = {
  flagAsNumber
}