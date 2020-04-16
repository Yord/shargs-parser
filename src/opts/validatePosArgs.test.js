const {validatePosArgs} = require('..')
const {invalidRequiredPositionalArgument, invalidVariadicPositionalArgument} = require('../errors')

test('validatePosArgs README example works', () => {
  const opts = [
    {key: 'pos1', types: ['string'], required: true, values: ['Logan']},
    {key: 'pos2', types: ['string'], required: false, values: ['Charles']},
    {key: 'pos3', types: ['string'], required: true, values: ['Xavier']},
    {key: 'pos4', types: null, values: ['Logan', 'Charles']},
    {key: 'pos5', types: ['string'], values: ['Xavier']}
  ]

  const {errs} = validatePosArgs({opts})

  const exp = [
    invalidRequiredPositionalArgument({positionalArguments: opts}),
    invalidVariadicPositionalArgument({positionalArguments: opts})
  ]

  expect(errs).toStrictEqual(exp)
})

test('validatePosArgs reports invalid required if required is not undefined, true or false', () => {
  const opts = [
    {key: 'pos1', types: ['string'], required: true, values: ['Logan']},
    {key: 'pos2', types: ['string'], required: false, values: ['Charles']},
    {key: 'pos3', types: ['string'], values: ['Xavier']},
    {key: 'pos5', types: ['string'], required: 'foo', values: ['Xavier']}
  ]

  const {errs} = validatePosArgs({opts})

  const exp = [
    invalidRequiredPositionalArgument({positionalArguments: opts})
  ]

  expect(errs).toStrictEqual(exp)
})

test('validatePosArgs reports invalid variadic if a variadic argument exists, but is not at the last position', () => {
  const opts = [
    {key: 'pos4', types: null, values: ['Logan', 'Charles']},
    {key: 'pos5', types: ['string'], values: ['Xavier']}
  ]

  const {errs} = validatePosArgs({opts})

  const exp = [
    invalidVariadicPositionalArgument({positionalArguments: opts})
  ]

  expect(errs).toStrictEqual(exp)
})