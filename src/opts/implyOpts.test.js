const {implyOpts} = require('..')
const {implicationViolated, wrongImpliesType} = require('../errors')

test('implyOpts README example works', () => {
  const age      = {key: 'age', types: ['number'], implies: ['birthday'], values: ['27']}
  const birthday = {key: 'birthday', types: ['string'], implies: ['age']}

  const obj = {
    opts: [age, birthday]
  }

  const {errs} = implyOpts(obj)

  const exp = [
    implicationViolated({key: 'age', implies: ['birthday'], option: age})
  ]

  expect(errs).toStrictEqual(exp)
})

test('implyOpts works on default values', () => {
  const age      = {key: 'age', types: ['number'], implies: ['birthday'], defaultValues: ['27']}
  const birthday = {key: 'birthday', types: ['string'], implies: ['age']}

  const obj = {
    opts: [age, birthday]
  }

  const {errs} = implyOpts(obj)

  const exp = [
    implicationViolated({key: 'age', implies: ['birthday'], option: age})
  ]

  expect(errs).toStrictEqual(exp)
})

test('implyOpts does not change anything if it passes', () => {
  const age      = {key: 'age', types: ['number'], contradicts: ['birthday'], values: ['27']}
  const birthday = {key: 'birthday', types: ['string'], contradicts: ['age'], values: ['27.7.1927']}

  const obj = {
    opts: [age, birthday]
  }

  const {opts} = implyOpts(obj)

  const exp = obj.opts

  expect(opts).toStrictEqual(exp)
})

test('implyOpts fails on wrong type', () => {
  const age      = {key: 'age', types: ['number'], implies: 'birthday', values: ['27']}
  const birthday = {key: 'birthday', types: ['string'], implies: ['age'], values: ['27.7.1927']}

  const obj = {
    opts: [age, birthday]
  }

  const {errs} = implyOpts(obj)

  const exp = [
    wrongImpliesType({key: 'age', type: 'string', option: age})
  ]

  expect(errs).toStrictEqual(exp)
})

test('implyOpts works if opts is undefined', () => {
  const obj = {}

  const {opts} = implyOpts(obj)

  expect(opts).toStrictEqual([])
})

test('implyOpts works if input is undefined', () => {
  const {opts} = implyOpts()

  expect(opts).toStrictEqual([])
})

test('implyOpts passes on errors', () => {
  const ERRS = ['foo']

  const {errs} = implyOpts({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})