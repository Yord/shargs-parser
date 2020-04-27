const {requireOptions} = require('..')
const {requiredOptionFormat, requiredOptionMissing} = require('../errors')

test('requireOptions README example works', () => {
  const answer = {key: 'answer', types: ['number'], required: true}

  const obj = {
    opts: [answer]
  }

  const {errs} = requireOptions(obj)

  const expErrs = [
    requiredOptionMissing({key: answer.key, option: answer})
  ]

  expect(errs).toStrictEqual(expErrs)
})

test('requireOptions keeps all options in opts', () => {
  const answer = {key: 'answer', types: ['number'], required: true}
  const question = {key: 'question', types: ['number'], required: true, values: ['Are values fine?']}

  const obj = {
    opts: [answer, question]
  }

  const {errs, opts} = requireOptions(obj)

  const expErrs = [
    requiredOptionMissing({key: answer.key, option: answer})
  ]

  const expOpts = obj.opts

  expect(errs).toStrictEqual(expErrs)
  expect(opts).toStrictEqual(expOpts)
})

test('requireOptions works as expected on all types', () => {
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

  const {errs} = requireOptions(obj)

  const exp = obj.opts.map(option =>
    requiredOptionMissing({key: option.key, option})
  )

  expect(errs).toStrictEqual(exp)
})

test('requireOptions works if required is false', () => {
  const answer = {key: 'answer', types: ['number'], required: false}

  const obj = {
    opts: [answer]
  }

  const {errs, opts} = requireOptions(obj)

  const expErrs = []

  const expOpts = obj.opts

  expect(errs).toStrictEqual(expErrs)
  expect(opts).toStrictEqual(expOpts)
})

test('requireOptions works if required is undefined', () => {
  const answer = {key: 'answer', types: ['number']}

  const obj = {
    opts: [answer]
  }

  const {errs, opts} = requireOptions(obj)

  const expErrs = []

  const expOpts = obj.opts

  expect(errs).toStrictEqual(expErrs)
  expect(opts).toStrictEqual(expOpts)
})

test('requireOptions works only with valid values', () => {
  const answer = {key: 'answer', types: ['number'], required: true, values: 42}
  const question = {key: 'question', types: ['number'], required: true, defaultValues: 'Are values fine?'}

  const obj = {
    opts: [answer, question]
  }

  // @ts-ignore
  const {errs} = requireOptions(obj)

  const exp = [
    requiredOptionFormat({key: answer.key, values: answer.values, option: answer}),
    requiredOptionFormat({key: question.key, defaultValues: question.defaultValues, option: question})
  ]

  expect(errs).toStrictEqual(exp)
})

test('requireOptions works if values are present', () => {
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

  const {errs} = requireOptions(obj)

  const exp = []

  expect(errs).toStrictEqual(exp)
})

test('requireOptions works if defaultValues are present', () => {
  const obj = {
    opts: [
      {key: 'title', types: ['string'], required: true, defaultValues: ['foo']},
      {key: 'numBool', types: ['number', 'bool'], required: true, defaultValues: ['23', 'true']},
      {key: 'answer', types: ['number'], required: true, defaultValues: ['42']},
      {key: 'help', args: ['help'], required: true, defaultValues: ['foo', 'bar']},
      {key: 'verbose', types: ['bool'], required: true, defaultValues: ['false']},
      {key: 'version', types: [], required: true, defaultValues: [1]}
    ]
  }

  const {errs} = requireOptions(obj)

  const exp = []

  expect(errs).toStrictEqual(exp)
})

test('requireOptions works if a mix of values and defaultValues is present', () => {
  const obj = {
    opts: [
      {key: 'title', types: ['string'], required: true, values: ['foo']},
      {key: 'numBool', types: ['number', 'bool'], required: true, defaultValues: ['23', 'true']},
      {key: 'answer', types: ['number'], required: true, values: ['42']},
      {key: 'help', args: ['help'], required: true, defaultValues: ['foo', 'bar']},
      {key: 'verbose', types: ['bool'], required: true, values: ['false']},
      {key: 'version', types: [], required: true, defaultValues: [1]}
    ]
  }

  const {errs} = requireOptions(obj)

  const exp = []

  expect(errs).toStrictEqual(exp)
})

test('requireOptions works if opts is undefined', () => {
  const obj = {}

  const {errs} = requireOptions(obj)

  expect(errs).toStrictEqual([])
})

test('requireOptions works if input is undefined', () => {
  const {errs} = requireOptions()

  expect(errs).toStrictEqual([])
})

test('requireOptions passes on errors', () => {
  const ERRS = [{code: 'foo', msg: 'bar', info: {}}]

  const {errs} = requireOptions({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})