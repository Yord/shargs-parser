const {traverseOpts} = require('./traverseOpts')
const {invalidBoolMapping} = require('../errors')
const {Bool, TypedVariable, ValidValuesTypes, ValidDefaultValuesTypes} = require('../ducktypes')
const {is}   = require('../combinators/is')
const {pipe} = require('../combinators/pipe')

const broadenBools = (alt = {}) => {
  const altToBool = reverse(alt)

  return pipe(
    broadenValues('values', ValidValuesTypes, altToBool, alt),
    broadenValues('defaultValues', ValidDefaultValuesTypes, altToBool, alt)
  )
}

module.exports = {
  broadenBools
}

function broadenValues (val, Domain, altToBool, alt) {
  return traverseOpts(is(TypedVariable, Domain, Bool))(opt => {
    let errs = []

    const {types, [val]: values} = opt

    const values2 = []

    for (let i = 0; i < values.length; i++) {
      const value = values[i]
      const type  = types[i]

      if (type === 'bool') {
        const bool = altToBool[value]
        if (bool === 'true' || bool === 'false') {
          values2.push(bool)
        } else {
          errs.push(invalidBoolMapping({key: value, alt}))
          values2.push(value)
        }
      } else {
        values2.push(value)
      }
    }

    return {errs, opts: [{...opt, [val]: values2}]}
  })
}

function reverse (alt) {
  return Object.keys(alt).reduce(
    (mapping, key) => {
      const alternatives = alt[key]
      if (Array.isArray(alternatives)) {
        return alternatives.reduce(
          (mapping, alternative) => ({...mapping, [alternative]: key}),
          mapping
        )
      } else {
        return mapping
      }
    },
    {true: 'true', false: 'false'}
  )
}