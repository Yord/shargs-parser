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

test('broadenBools README example works for defaultValues', () => {
  const obj = {
    opts: [
      {key: 'answer', types: ['number'], defaultValues: ['42']},
      {key: 'numBool', types: ['number', 'bool'], defaultValues: ['23', 'yes']},
      {key: 'verbose', types: ['bool'], defaultValues: ['no']},
      {key: 'verbose', types: ['bool'], defaultValues: ['f']}
    ]
  }

  const alt = {
    true: ['yes'],
    false: ['no', 'f']
  }

  const {opts} = broadenBools(alt)(obj)

  const exp = [
    {key: 'answer', types: ['number'], defaultValues: ['42']},
    {key: 'numBool', types: ['number', 'bool'], defaultValues: ['23', 'true']},
    {key: 'verbose', types: ['bool'], defaultValues: ['false']},
    {key: 'verbose', types: ['bool'], defaultValues: ['false']}
  ]

  expect(opts).toStrictEqual(exp)
})

test('broadenBools README example works for both, values and defaultValues together', () => {
  const obj = {
    opts: [
      {key: 'answer', types: ['number'], defaultValues: ['42']},
      {key: 'numBool', types: ['number', 'bool'], defaultValues: ['23', 'yes'], values: ['42', 'no']},
      {key: 'verbose', types: ['bool'], defaultValues: ['no'], values: ['yes']},
      {key: 'verbose', types: ['bool'], defaultValues: ['f'], values: ['t']}
    ]
  }

  const alt = {
    true: ['yes', 't'],
    false: ['no', 'f']
  }

  const {opts} = broadenBools(alt)(obj)

  const exp = [
    {key: 'answer', types: ['number'], defaultValues: ['42']},
    {key: 'numBool', types: ['number', 'bool'], defaultValues: ['23', 'true'], values: ['42', 'false']},
    {key: 'verbose', types: ['bool'], defaultValues: ['false'], values: ['true']},
    {key: 'verbose', types: ['bool'], defaultValues: ['false'], values: ['true']}
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

test('broadenBools reports error on unknown bool defaultValue', () => {
  const obj = {
    opts: [
      {key: 'numBool', types: ['number', 'bool'], defaultValues: ['23', 't']},
      {key: 'verbose', types: ['bool'], defaultValues: ['no']},
      {key: 'verbose', types: ['bool'], defaultValues: ['f']}
    ]
  }

  const alt = {
    true: ['yes'],
    false: ['no', 'f']
  }

  const {errs, opts} = broadenBools(alt)(obj)

  const expOpts = [
    {key: 'numBool', types: ['number', 'bool'], defaultValues: ['23', 't']},
    {key: 'verbose', types: ['bool'], defaultValues: ['false']},
    {key: 'verbose', types: ['bool'], defaultValues: ['false']}
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
  const ERRS = ['foo']

  const alt = {}

  const {errs} = broadenBools(alt)({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})