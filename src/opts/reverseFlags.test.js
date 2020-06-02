const {reverseFlags} = require('..')

test('reverseFlags README example works', () => {
  const obj = {
    opts: [
      {key: 'flag', args: ['-f'], types: [], reverse: true, values: [1]}
    ]
  }

  const {opts} = reverseFlags(obj)

  const exp = [
    {key: 'flag', args: ['-f'], types: [], reverse: true, values: [-1]}
  ]

  expect(opts).toStrictEqual(exp)
})

test('reverseFlags does not change booleans', () => {
  const obj = {
    opts: [
      {key: 'bool', types: ['bool'], reverse: true, values: [true]}
    ]
  }

  const {opts} = reverseFlags(obj)

  const exp = [
    {key: 'bool', types: ['bool'], reverse: true, values: [true]}
  ]

  expect(opts).toStrictEqual(exp)
})

test('reverseFlags does not reverse flags without values', () => {
  const obj = {
    opts: [
      {key: 'flag', args: ['-f'], types: [], reverse: true, values: [1]},
      {key: 'flag2', args: ['-f'], types: [], reverse: true}
    ]
  }

  const {opts} = reverseFlags(obj)

  const exp = [
    {key: 'flag', args: ['-f'], types: [], reverse: true, values: [-1]},
    {key: 'flag2', args: ['-f'], types: [], reverse: true}
  ]

  expect(opts).toStrictEqual(exp)
})

test('reverseFlags works if opts is undefined', () => {
  const obj = {}

  const {errs} = reverseFlags(obj)

  expect(errs).toStrictEqual([])
})

test('reverseFlags works if input is undefined', () => {
  const {errs} = reverseFlags()

  expect(errs).toStrictEqual([])
})

test('reverseFlags passes on errors', () => {
  const ERRS = [{code: 'foo', msg: 'bar', info: {}}]

  const {errs} = reverseFlags({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})