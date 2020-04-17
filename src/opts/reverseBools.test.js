const {reverseBools} = require('..')

test('reverseBools README example works', () => {
  const obj = {
    opts: [
      {key: 'bool', types: ['bool'], reverse: true, values: [true]},
      {key: 'bool', types: ['bool'], reverse: true, values: ['true']}
    ]
  }

  const {opts} = reverseBools(obj)

  const exp = [
    {key: 'bool', types: ['bool'], reverse: true, values: [false]},
    {key: 'bool', types: ['bool'], reverse: true, values: ['false']}
  ]

  expect(opts).toStrictEqual(exp)
})

test('reverseBools works as expected with values', () => {
  const obj = {
    opts: [
      {key: 'bool1', types: ['bool'], reverse: true, values: [true]},
      {key: 'bool2', types: ['bool'], reverse: true, values: [false]},
      {key: 'bool3', types: ['bool'], reverse: true, values: ['true']},
      {key: 'bool4', types: ['bool'], reverse: true, values: ['false']},
      {key: 'bool5', types: ['bool'], reverse: true, values: [42]},
      {key: 'bool6', types: ['bool'], reverse: true, values: [null]},
      {key: 'bool7', types: ['bool'], reverse: true, values: [undefined]},
      {key: 'bool8', types: ['bool'], reverse: true, values: [[42]]},
      {key: 'bool9', types: ['bool'], reverse: true, values: [{}]},
      {key: 'bool10', types: ['string', 'bool'], reverse: true, values: ['foo', 'true']}
    ]
  }

  const {opts} = reverseBools(obj)

  const exp = [
    {key: 'bool1', types: ['bool'], reverse: true, values: [false]},
    {key: 'bool2', types: ['bool'], reverse: true, values: [true]},
    {key: 'bool3', types: ['bool'], reverse: true, values: ['false']},
    {key: 'bool4', types: ['bool'], reverse: true, values: ['true']},
    {key: 'bool5', types: ['bool'], reverse: true, values: [42]},
    {key: 'bool6', types: ['bool'], reverse: true, values: [null]},
    {key: 'bool7', types: ['bool'], reverse: true, values: [undefined]},
    {key: 'bool8', types: ['bool'], reverse: true, values: [[42]]},
    {key: 'bool9', types: ['bool'], reverse: true, values: [{}]},
    {key: 'bool10', types: ['string', 'bool'], reverse: true, values: ['foo', 'false']}
  ]

  expect(opts).toStrictEqual(exp)
})

test('reverseBools works as expected with defaultValues', () => {
  const obj = {
    opts: [
      {key: 'bool1', types: ['bool'], reverse: true, defaultValues: [true]},
      {key: 'bool2', types: ['bool'], reverse: true, defaultValues: [false]},
      {key: 'bool3', types: ['bool'], reverse: true, defaultValues: ['true']},
      {key: 'bool4', types: ['bool'], reverse: true, defaultValues: ['false']},
      {key: 'bool5', types: ['bool'], reverse: true, defaultValues: [42]},
      {key: 'bool6', types: ['bool'], reverse: true, defaultValues: [null]},
      {key: 'bool7', types: ['bool'], reverse: true, defaultValues: [undefined]},
      {key: 'bool8', types: ['bool'], reverse: true, defaultValues: [[42]]},
      {key: 'bool9', types: ['bool'], reverse: true, defaultValues: [{}]},
      {key: 'bool10', types: ['string', 'bool'], reverse: true, defaultValues: ['foo', 'true']}
    ]
  }

  const {opts} = reverseBools(obj)

  const exp = [
    {key: 'bool1', types: ['bool'], reverse: true, defaultValues: [false]},
    {key: 'bool2', types: ['bool'], reverse: true, defaultValues: [true]},
    {key: 'bool3', types: ['bool'], reverse: true, defaultValues: ['false']},
    {key: 'bool4', types: ['bool'], reverse: true, defaultValues: ['true']},
    {key: 'bool5', types: ['bool'], reverse: true, defaultValues: [42]},
    {key: 'bool6', types: ['bool'], reverse: true, defaultValues: [null]},
    {key: 'bool7', types: ['bool'], reverse: true, defaultValues: [undefined]},
    {key: 'bool8', types: ['bool'], reverse: true, defaultValues: [[42]]},
    {key: 'bool9', types: ['bool'], reverse: true, defaultValues: [{}]},
    {key: 'bool10', types: ['string', 'bool'], reverse: true, defaultValues: ['foo', 'false']}
  ]

  expect(opts).toStrictEqual(exp)
})

test('reverseBools does not change flags', () => {
  const obj = {
    opts: [
      {key: 'bool', types: ['bool'], reverse: true, values: [true]},
      {key: 'flag', types: [], reverse: true, values: [1]}
    ]
  }

  const {opts} = reverseBools(obj)

  const exp = [
    {key: 'bool', types: ['bool'], reverse: true, values: [false]},
    {key: 'flag', types: [], reverse: true, values: [1]}
  ]

  expect(opts).toStrictEqual(exp)
})

test('reverseBools does not change bool options with invalid values', () => {
  const obj = {
    opts: [
      {key: 'bool1', types: ['bool'], reverse: true, values: [42]},
      {key: 'bool2', types: ['bool'], reverse: true, values: ['42']},
      {key: 'bool2', types: ['bool'], reverse: true, values: [undefined]},
      {key: 'bool2', types: ['bool'], reverse: true, values: [null]}
    ]
  }

  const {opts} = reverseBools(obj)

  const exp = [
    {key: 'bool1', types: ['bool'], reverse: true, values: [42]},
    {key: 'bool2', types: ['bool'], reverse: true, values: ['42']},
    {key: 'bool2', types: ['bool'], reverse: true, values: [undefined]},
    {key: 'bool2', types: ['bool'], reverse: true, values: [null]}
  ]

  expect(opts).toStrictEqual(exp)
})

test('reverseBools does not change bool options with invalid defaultValues', () => {
  const obj = {
    opts: [
      {key: 'bool1', types: ['bool'], reverse: true, defaultValues: [42]},
      {key: 'bool2', types: ['bool'], reverse: true, defaultValues: ['42']},
      {key: 'bool2', types: ['bool'], reverse: true, defaultValues: [undefined]},
      {key: 'bool2', types: ['bool'], reverse: true, defaultValues: [null]}
    ]
  }

  const {opts} = reverseBools(obj)

  const exp = [
    {key: 'bool1', types: ['bool'], reverse: true, defaultValues: [42]},
    {key: 'bool2', types: ['bool'], reverse: true, defaultValues: ['42']},
    {key: 'bool2', types: ['bool'], reverse: true, defaultValues: [undefined]},
    {key: 'bool2', types: ['bool'], reverse: true, defaultValues: [null]}
  ]

  expect(opts).toStrictEqual(exp)
})

test('reverseBools works if opts is undefined', () => {
  const obj = {}

  const {errs} = reverseBools(obj)

  expect(errs).toStrictEqual([])
})

test('reverseBools works if input is undefined', () => {
  const {errs} = reverseBools()

  expect(errs).toStrictEqual([])
})

test('reverseBools passes on errors', () => {
  const ERRS = ['foo']

  const {errs} = reverseBools({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})