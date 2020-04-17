const {arrayOnRepeat}     = require('..')
const {incompatibleTypes} = require('../errors')

test('arrayOnRepeat README example works', () => {
  const obj = {
    opts: [
      {key: 'age', types: ['string'], values: ['42']},
      {key: 'age', types: ['number'], values: [42]}
    ]
  }

  const {opts} = arrayOnRepeat(obj)

  const exp = [
    {key: 'age', types: ['string', 'number'], values: ['42', 42]}
  ]

  expect(opts).toStrictEqual(exp)
})

test('arrayOnRepeat works with arrays, variadic, and singleton, but not commands', () => {
  const obj = {
    opts: [
      {key: 'numBool', types: ['number', 'bool'], values: ['42', 'true']},
      {key: 'numBool', types: ['number', 'bool'], values: ['23', 'false']},
      {key: 'foo', types: ['string'], values: ['foo']},
      {key: 'foo', types: ['number'], values: ['42']},
      {key: 'bar', types: ['string', 'bool'], values: ['foo', 'true']},
      {key: 'bar', types: ['number'], values: ['42']},
      {key: 'variadic', values: ['1', '2']},
      {key: 'variadic', values: ['3']}
    ]
  }

  const {opts} = arrayOnRepeat(obj)

  const exp = [
    {key: 'numBool', types: ['number', 'bool', 'number', 'bool'], values: ['42', 'true', '23', 'false']},
    {key: 'foo', types: ['string', 'number'], values: ['foo', '42']},
    {key: 'bar', types: ['string', 'bool', 'number'], values: ['foo', 'true', '42']},
    {key: 'variadic', values: ['1', '2', '3']}
  ]

  expect(opts).toStrictEqual(exp)
})

test('arrayOnRepeat ignores flags and commands', () => {
  const obj = {
    opts: [
      {key: 'flag', types: [], args: [], values: [1]},
      {key: 'flag', types: [], args: [], values: [1]},
      {key: 'commands', args: [], opts: [], values: ['1', '2']},
      {key: 'commands', args: [], opts: [], values: ['3', '4']}
    ]
  }

  const {opts} = arrayOnRepeat(obj)

  const exp = obj.opts

  expect(opts).toStrictEqual(exp)
})

test('arrayOnRepeat does not change non-repeated options', () => {
  const obj = {
    opts: [
      {key: 'age', types: ['string'], values: ['42']},
      {key: 'numBool', types: ['number', 'bool'], values: ['42', 'true']}
    ]
  }

  const {opts} = arrayOnRepeat(obj)

  const exp = obj.opts

  expect(opts).toStrictEqual(exp)
})

test('arrayOnRepeat does not change options without values', () => {
  const obj = {
    opts: [
      {key: 'age', types: ['string']},
      {key: 'numBool', types: ['number', 'bool']}
    ]
  }

  const {opts} = arrayOnRepeat(obj)

  const exp = obj.opts

  expect(opts).toStrictEqual(exp)
})

test('arrayOnRepeat works if opts is undefined', () => {
  const obj = {}

  const {opts} = arrayOnRepeat(obj)

  expect(opts).toStrictEqual([])
})

test('arrayOnRepeat works if input is undefined', () => {
  const {opts} = arrayOnRepeat()

  expect(opts).toStrictEqual([])
})

test('arrayOnRepeat passes on errors', () => {
  const ERRS = ['foo']

  const {errs} = arrayOnRepeat({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})