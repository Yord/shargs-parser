const {restrictToOnly} = require('..')
const {valueRestrictionsViolated} = require('../errors')

test('restrictToOnly README example works', () => {
  const answer = {key: 'answer', types: ['number'], only: [42], values: [23]}

  const obj = {
    opts: [answer]
  }

  const {errs} = restrictToOnly(obj)

  const exp = [
    valueRestrictionsViolated({
      key: answer.key,
      values: answer.values,
      index: 0,
      only: answer.only,
      option: answer
    })
  ]

  expect(errs).toStrictEqual(exp)
})

test('restrictToOnly works as expected on all types', () => {
  const obj = {
    opts: [
      {key: 'title', only: ["The Hitchhiker's Guide to the Galaxy"], values: ["The Hitchhiker's Guide to the Galaxy"]},
      {key: 'numBool', only: [23, true], values: [23, true]},
      {key: 'answer', only: [42], values: [42]},
      {key: 'help', only: ['foo --bar'], values: ['foo --bar']},
      {key: 'verbose', only: [false], values: [false]},
      {key: 'version', only: [1], values: [1]}
    ]
  }

  const {opts} = restrictToOnly(obj)

  const exp = obj.opts

  expect(opts).toStrictEqual(exp)
})

test('restrictToOnly does nothing if the only attribute is not an array', () => {
  const obj = {
    opts: [
      {key: 'title', only: null, values: ["The Hitchhiker's Guide to the Galaxy"]},
      {key: 'numBool', only: null, values: [23, true]},
      {key: 'answer', only: null, values: [42]},
      {key: 'help', only: null, values: ['foo --bar']},
      {key: 'verbose', only: null, values: [false]},
      {key: 'version', only: null, values: [1]},
      {key: 'title', values: ["The Hitchhiker's Guide to the Galaxy"]},
      {key: 'numBool', values: [23, true]},
      {key: 'answer', values: [42]},
      {key: 'help', values: ['foo --bar']},
      {key: 'verbose', values: [false]},
      {key: 'version', values: [1]}
    ]
  }

  const {opts} = restrictToOnly(obj)

  const exp = obj.opts

  expect(opts).toStrictEqual(exp)
})

test('restrictToOnly works if values are undefined', () => {
  const answer = {key: 'answer', only: [42]}

  const obj = {
    opts: [answer]
  }

  const {opts} = restrictToOnly(obj)

  const exp = [answer]

  expect(opts).toStrictEqual(exp)
})

test('restrictToOnly works if values are not an array', () => {
  const answer = {key: 'answer', only: [42], values: null}
  
  const obj = {
    opts: [answer]
  }

  const {opts} = restrictToOnly(obj)

  const exp = [answer]

  expect(opts).toStrictEqual(exp)
})

test('restrictToOnly fails if a value is not allowed', () => {
  const obj = {
    opts: [
      {key: 'title', types: ['string'], only: ["Dirk Gently"], values: ["The Hitchhiker's Guide to the Galaxy"]},
      {key: 'answer', types: ['number'], only: [23], values: [42]},
      {key: 'help', types: null, only: ['--foo bar'], values: ['foo --bar']},
      {key: 'verbose', types: ['bool'], only: [true], values: [false]}
    ]
  }

  const {errs, opts} = restrictToOnly(obj)

  const expErrs = obj.opts.map(option => valueRestrictionsViolated({
    key: option.key,
    values: option.values,
    index: 0,
    only: option.only,
    option
  }))

  const expOpts = obj.opts

  expect(errs).toStrictEqual(expErrs)
  expect(opts).toStrictEqual(expOpts)
})

test('restrictToOnly fails on the first value of an array', () => {
  const only   = [42, true]
  const option = {key: 'numBool', types: ['number', 'bool'], only, values: [23, true]}

  const obj = {opts: [option]}

  const {errs} = restrictToOnly(obj)

  const exp = [
    valueRestrictionsViolated({
      key: 'numBool',
      values: [23, true],
      index: 0,
      only,
      option
    })
  ]

  expect(errs).toStrictEqual(exp)
})

test('restrictToOnly fails on the second value of an array', () => {
  const only   = [23, false]
  const option = {key: 'numBool', types: ['number', 'bool'], only, values: [23, true]}

  const obj = {opts: [option]}

  const {errs} = restrictToOnly(obj)

  const exp = [
    valueRestrictionsViolated({
      key: 'numBool',
      values: [23, true],
      index: 1,
      only,
      option
    })
  ]

  expect(errs).toStrictEqual(exp)
})

test('restrictToOnly works if opts is undefined', () => {
  const obj = {}

  const {opts} = restrictToOnly(obj)

  expect(opts).toStrictEqual([])
})

test('restrictToOnly works if input is undefined', () => {
  const {opts} = restrictToOnly()

  expect(opts).toStrictEqual([])
})

test('restrictToOnly passes on errors', () => {
  const ERRS = [{code: 'foo', msg: 'bar', info: {}}]

  const {errs} = restrictToOnly({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})