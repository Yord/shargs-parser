const {setDefaultValues} = require('..')

test('setDefaultValues README example works', () => {
  const obj = {
    opts: [
      {key: 'flag', args: ['-f'], types: [],       defaultValues: [1]},
      {key: 'bool', args: ['-b'], types: ['bool'], defaultValues: ['true'], values: ['false']}
    ]
  }

  const {opts} = setDefaultValues(obj)

  const exp = [
    {key: 'flag', args: ['-f'], types: [],       defaultValues: [1],      values: [1]},
    {key: 'bool', args: ['-b'], types: ['bool'], defaultValues: ['true'], values: ['false']}
  ]

  expect(opts).toStrictEqual(exp)
})

test('setDefaultValues works for all types', () => {
  const obj = {
    opts: [
      {key: 'flag',       args: ['-f'], types: [],                             defaultValues: [1]},
      {key: 'primitive',  args: ['-p'], types: ['string'],                     defaultValues: ['s']},
      {key: 'array',      args: ['-a'], types: ['string', 'number'],           defaultValues: ['s', '1']},
      {key: 'subcommand', args: ['sc'],                              opts: [], defaultValues: [{values: ['A']}]}
    ]
  }

  const {opts} = setDefaultValues(obj)

  const exp = [
    {key: 'flag',       args: ['-f'], types: [],                             defaultValues: [1],               values: [1]},
    {key: 'primitive',  args: ['-p'], types: ['string'],                     defaultValues: ['s'],             values: ['s']},
    {key: 'array',      args: ['-a'], types: ['string', 'number'],           defaultValues: ['s', '1'],        values: ['s', '1']},
    {key: 'subcommand', args: ['sc'],                              opts: [], defaultValues: [{values: ['A']}], values: [{values: ['A']}]}
  ]

  expect(opts).toStrictEqual(exp)
})

test('setDefaultValues works if opts is undefined', () => {
  const obj = {}

  const {errs} = setDefaultValues(obj)

  expect(errs).toStrictEqual([])
})

test('setDefaultValues works if input is undefined', () => {
  const {errs} = setDefaultValues()

  expect(errs).toStrictEqual([])
})

test('setDefaultValues passes on errors', () => {
  const ERRS = [{code: 'foo', msg: 'bar', info: {}}]

  const {errs} = setDefaultValues({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})