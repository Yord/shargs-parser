const traverseArgs = require('./traverseArgs')

module.exports = traverseArgs({
  array: ({key, val, errs, args}) => ({
    errs,
    args: {...args, [key]: key === '_' ? [] : val}
  })
})