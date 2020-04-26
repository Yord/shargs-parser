const {traverseArgs} = require('./traverseArgs')

const clearRest = traverseArgs({
  array: ({key, val, errs, args}) => ({
    errs,
    args: {...args, [key]: key === '_' ? [] : val}
  })
})

module.exports = {
  clearRest
}