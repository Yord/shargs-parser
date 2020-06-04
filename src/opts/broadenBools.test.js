const {broadenBools} = require('..')
const {invalidBoolMapping} = require('../errors')

test('broadenBools README example works', () => {
  const obj = {
    opts: [
      {key: 'answer', types: ['number'], values: ['42']},
      {key: 'numBool', types: ['number', 'bool'], values: ['23', 'yes']},
      {key: 'verbose', types: ['bool'], values: ['no']},
      {key: 'verbose', types: ['bool'], values: ['false']}
    ]
  }

  const alt = {
    true: ['yes'],
    false: ['no', 'f']
  }

  const {opts} = broadenBools(alt)(obj)

  const exp = [
    {key: 'answer', types: ['number'], values: ['42']},
    {key: 'numBool', types: ['number', 'bool'], values: ['23', 'true']},
    {key: 'verbose', types: ['bool'], values: ['false']},
    {key: 'verbose', types: ['bool'], values: ['false']}
  ]

  expect(opts).toStrictEqual(exp)
})

test('broadenBools reports error on unknown bool value', () => {
  const obj = {
    opts: [
      {key: 'numBool', types: ['number', 'bool'], values: ['23', 't']},
      {key: 'verbose', types: ['bool'], values: ['no']},
      {key: 'verbose', types: ['bool'], values: ['f']}
    ]
  }

  const alt = {
    true: ['yes'],
    false: ['no', 'f']
  }

  const {errs, opts} = broadenBools(alt)(obj)

  const expOpts = [
    {key: 'numBool', types: ['number', 'bool'], values: ['23', 't']},
    {key: 'verbose', types: ['bool'], values: ['false']},
    {key: 'verbose', types: ['bool'], values: ['false']}
  ]

  const expErrs = [
    invalidBoolMapping({key: 't', alt})
  ]

  expect(opts).toStrictEqual(expOpts)
  expect(errs).toStrictEqual(expErrs)
})

test('broadenBools reports error on broken alt object', () => {
  const obj = {
    opts: [
      {key: 'numBool', types: ['number', 'bool'], values: ['23', 'yes']},
      {key: 'verbose', types: ['bool'], values: ['no']},
      {key: 'verbose', types: ['bool'], values: ['f']}
    ]
  }

  const alt = {
    true: 'yes',
    false: ['no', 'f']
  }

  // @ts-ignore
  const {errs, opts} = broadenBools(alt)(obj)

  const expOpts = [
    {key: 'numBool', types: ['number', 'bool'], values: ['23', 'yes']},
    {key: 'verbose', types: ['bool'], values: ['false']},
    {key: 'verbose', types: ['bool'], values: ['false']}
  ]

  const expErrs = [
    invalidBoolMapping({key: 'yes', alt})
  ]

  expect(opts).toStrictEqual(expOpts)
  expect(errs).toStrictEqual(expErrs)
})

test('broadenBools works if alt is undefined', () => {
  const obj = {}

  const {opts} = broadenBools()(obj)

  expect(opts).toStrictEqual([])
})

test('broadenBools works if opts is undefined', () => {
  const obj = {}

  const alt = {}

  const {opts} = broadenBools(alt)(obj)

  expect(opts).toStrictEqual([])
})

test('broadenBools works if input is undefined', () => {
  const alt = {}
  
  const {opts} = broadenBools(alt)()

  expect(opts).toStrictEqual([])
})

test('broadenBools passes on errors', () => {
  const ERRS = [{code: 'foo', msg: 'bar', info: {}}]

  const alt = {}

  const {errs} = broadenBools(alt)({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})