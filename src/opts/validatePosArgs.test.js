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

test('validatePosArgs does not report invalid required if no true required ever occurs after an undefined or false required', () => {
  const opts = [
    {key: 'pos1', types: ['string'], required: true, values: ['Logan']},
    {key: 'pos2', types: ['string'], required: true, values: ['Charles']},
    {key: 'pos3', types: ['string'], required: false, values: ['Xavier']},
    {key: 'pos5', types: ['string'], values: ['Xavier']}
  ]

  const {errs} = validatePosArgs({opts})

  const exp = []

  expect(errs).toStrictEqual(exp)
})

test('validatePosArgs does not report invalid variadic if exactly one variadic argument exists that is at the last position', () => {
  const opts = [
    {key: 'pos5', types: ['string'], values: ['Xavier']},
    {key: 'pos4', types: null, values: ['Logan', 'Charles']}
  ]

  const {errs} = validatePosArgs({opts})

  const exp = []

  expect(errs).toStrictEqual(exp)
})

test('validatePosArgs works if opts is undefined', () => {
  const obj = {}

  const {opts} = validatePosArgs(obj)

  expect(opts).toStrictEqual([])
})

test('validatePosArgs works if input is undefined', () => {
  const {opts} = validatePosArgs()

  expect(opts).toStrictEqual([])
})

test('validatePosArgs passes on errors', () => {
  const ERRS = ['foo']

  const {errs} = validatePosArgs({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})