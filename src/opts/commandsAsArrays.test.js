const {commandsAsArrays} = require('..')

test('commandsAsArrays README example works', () => {
  const obj = {
    opts: [
      {key: 'heroes', types: null, array: true, values: ['Charles', 'Logan']}
    ]
  }

  const {opts} = commandsAsArrays(obj)

  const exp = [
    {key: 'heroes', types: ['string', 'string'], array: true, values: ['Charles', 'Logan']}
  ]

  expect(opts).toStrictEqual(exp)
})

test('commandsAsArrays works with defaultValues', () => {
  const obj = {
    opts: [
      {key: 'heroes', types: null, array: true, defaultValues: ['Charles', 'Logan']}
    ]
  }

  const {opts} = commandsAsArrays(obj)

  const exp = [
    {key: 'heroes', types: ['string', 'string'], array: true, defaultValues: ['Charles', 'Logan']}
  ]

  expect(opts).toStrictEqual(exp)
})

test('commandsAsArrays does not change non-command options', () => {
  const obj = {
    opts: [
      {key: 'name', types: ['string'], array: true, defaultValues: ['Charles', 'Logan']}
    ]
  }

  const {opts} = commandsAsArrays(obj)

  const exp = [
    {key: 'name', types: ['string'], array: true, defaultValues: ['Charles', 'Logan']}
  ]

  expect(opts).toStrictEqual(exp)
})

test('commandsAsArrays adds an empty array as defaultValues if values and defaultValues are missing', () => {
  const obj = {
    opts: [
      {key: 'heroes', types: null, array: true}
    ]
  }

  const {opts} = commandsAsArrays(obj)

  const exp = [
    {key: 'heroes', types: null, array: true, defaultValues: []}
  ]

  expect(opts).toStrictEqual(exp)
})

test('commandsAsArrays works if opts is undefined', () => {
  const obj = {}

  const {errs} = commandsAsArrays(obj)

  expect(errs).toStrictEqual([])
})

test('commandsAsArrays works if input is undefined', () => {
  const {errs} = commandsAsArrays()

  expect(errs).toStrictEqual([])
})

test('commandsAsArrays passes on errors', () => {
  const ERRS = ['foo']

  const {errs} = commandsAsArrays({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})