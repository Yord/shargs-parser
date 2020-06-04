const {contradictOpts} = require('..')
const {contradictionDetected, wrongContradictsType} = require('../errors')

test('contradictOpts README example works', () => {
  const age      = {key: 'age', types: ['number'], contradicts: ['birthday'], values: ['27']}
  const birthday = {key: 'birthday', types: ['string'], contradicts: ['age'], values: ['27.7.1927']}

  const obj = {
    opts: [age, birthday]
  }

  const {errs} = contradictOpts(obj)

  const exp = [
    contradictionDetected({key: 'age', contradicts: ['birthday'], option: age}),
    contradictionDetected({key: 'birthday', contradicts: ['age'], option: birthday})
  ]

  expect(errs).toStrictEqual(exp)
})

test('contradictOpts does not change anything if it passes', () => {
  const obj = {
    opts: [
      {key: 'age', types: ['number'], contradicts: ['birthday'], values: ['27']},
      {key: 'birthday', types: ['string'], contradicts: ['age']},
      {values: ['foo']},
      {key: 'variadic', contradicts: ['birthday'], values: ['foo', 'bar']},
      {key: 'command', args: ['command'], opts: [], contradicts: ['birthday'], values: ['foo', 'bar']}
    ]
  }

  const {opts} = contradictOpts(obj)

  const exp = obj.opts

  expect(opts).toStrictEqual(exp)
})

test('contradictOpts fails on wrong type', () => {
  const age      = {key: 'age', types: ['number'], contradicts: 'birthday', values: ['27']}
  const birthday = {key: 'birthday', types: ['string'], contradicts: ['age']}

  const obj = {
    opts: [age, birthday]
  }

  // @ts-ignore
  const {errs} = contradictOpts(obj)

  const exp = [
    wrongContradictsType({key: 'age', type: 'string', option: age})
  ]

  expect(errs).toStrictEqual(exp)
})

test('contradictOpts works if opts is undefined', () => {
  const obj = {}

  const {opts} = contradictOpts(obj)

  expect(opts).toStrictEqual([])
})

test('contradictOpts works if input is undefined', () => {
  const {opts} = contradictOpts()

  expect(opts).toStrictEqual([])
})

test('contradictOpts passes on errors', () => {
  const ERRS = [{code: 'foo', msg: 'bar', info: {}}]

  const {errs} = contradictOpts({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})