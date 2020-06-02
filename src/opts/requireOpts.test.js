const {requireOpts} = require('..')
const {requiredOptionFormat, requiredOptionMissing} = require('../errors')

test('requireOpts README example works', () => {
  const answer = {key: 'answer', types: ['number'], required: true}

  const obj = {
    opts: [answer]
  }

  const {errs} = requireOpts(obj)

  const expErrs = [
    requiredOptionMissing({key: answer.key, option: answer})
  ]

  expect(errs).toStrictEqual(expErrs)
})

test('requireOpts keeps all options in opts', () => {
  const answer = {key: 'answer', types: ['number'], required: true}
  const question = {key: 'question', types: ['number'], required: true, values: ['Are values fine?']}

  const obj = {
    opts: [answer, question]
  }

  const {errs, opts} = requireOpts(obj)

  const expErrs = [
    requiredOptionMissing({key: answer.key, option: answer})
  ]

  const expOpts = obj.opts

  expect(errs).toStrictEqual(expErrs)
  expect(opts).toStrictEqual(expOpts)
})

test('requireOpts works as expected on all types', () => {
  const obj = {
    opts: [
      {key: 'title', types: ['string'], required: true},
      {key: 'numBool', types: ['number', 'bool'], required: true},
      {key: 'answer', types: ['number'], required: true},
      {key: 'help', types: null, required: true},
      {key: 'verbose', types: ['bool'], required: true},
      {key: 'version', types: [], required: true}
    ]
  }

  const {errs} = requireOpts(obj)

  const exp = obj.opts.map(option =>
    requiredOptionMissing({key: option.key, option})
  )

  expect(errs).toStrictEqual(exp)
})

test('requireOpts works if required is false', () => {
  const answer = {key: 'answer', types: ['number'], required: false}

  const obj = {
    opts: [answer]
  }

  const {errs, opts} = requireOpts(obj)

  const expErrs = []

  const expOpts = obj.opts

  expect(errs).toStrictEqual(expErrs)
  expect(opts).toStrictEqual(expOpts)
})

test('requireOpts works if required is undefined', () => {
  const answer = {key: 'answer', types: ['number']}

  const obj = {
    opts: [answer]
  }

  const {errs, opts} = requireOpts(obj)

  const expErrs = []

  const expOpts = obj.opts

  expect(errs).toStrictEqual(expErrs)
  expect(opts).toStrictEqual(expOpts)
})

test('requireOpts works only with valid values', () => {
  const answer = {key: 'answer', types: ['number'], required: true, values: 42}

  const obj = {
    opts: [answer]
  }

  // @ts-ignore
  const {errs} = requireOpts(obj)

  const exp = [
    requiredOptionFormat({key: answer.key, values: answer.values, option: answer})
  ]

  expect(errs).toStrictEqual(exp)
})

test('requireOpts works if values are present', () => {
  const obj = {
    opts: [
      {key: 'title', types: ['string'], required: true, values: ['foo']},
      {key: 'numBool', types: ['number', 'bool'], required: true, values: ['23', 'true']},
      {key: 'answer', types: ['number'], required: true, values: ['42']},
      {key: 'help', args: ['help'], required: true, values: ['foo', 'bar']},
      {key: 'verbose', types: ['bool'], required: true, values: ['false']},
      {key: 'version', types: [], required: true, values: [1]}
    ]
  }

  const {errs} = requireOpts(obj)

  const exp = []

  expect(errs).toStrictEqual(exp)
})

test('requireOpts works if opts is undefined', () => {
  const obj = {}

  const {errs} = requireOpts(obj)

  expect(errs).toStrictEqual([])
})

test('requireOpts works if input is undefined', () => {
  const {errs} = requireOpts()

  expect(errs).toStrictEqual([])
})

test('requireOpts passes on errors', () => {
  const ERRS = [{code: 'foo', msg: 'bar', info: {}}]

  const {errs} = requireOpts({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})