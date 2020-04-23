const {demandACommand} = require('..')
const {commandRequired} = require('../errors')

test('demandACommand README example works', () => {
  const opts = [
    {key: 'title', types: ['string'], values: ["The Hitchhiker's Guide to the Galaxy"]},
    {key: 'numBool', types: ['number', 'bool'], values: ['23', 'true']},
    {key: 'answer', types: ['number'], values: ['42']},
    {key: 'verbose', types: ['bool'], values: ['false']},
    {key: 'version', types: [], values: [1]}
  ]

  const {errs} = demandACommand({opts})

  const exp = [
    commandRequired({options: opts})
  ]

  expect(errs).toStrictEqual(exp)
})

test('demandACommand records no error if a command has values', () => {
  const opts = [
    {key: 'title', types: ['string'], values: ["The Hitchhiker's Guide to the Galaxy"]},
    {key: 'numBool', types: ['number', 'bool'], values: ['23', 'true']},
    {key: 'answer', types: ['number'], values: ['42']},
    {key: 'help', args: ['help'], opts: [], values: ['foo', '--bar']},
    {key: 'verbose', types: ['bool'], values: ['false']},
    {key: 'version', types: [], values: [1]}
  ]

  const {errs} = demandACommand({opts})

  const exp = []

  expect(errs).toStrictEqual(exp)
})

test('demandACommand records no error if a command has defaultValues', () => {
  const opts = [
    {key: 'title', types: ['string'], values: ["The Hitchhiker's Guide to the Galaxy"]},
    {key: 'numBool', types: ['number', 'bool'], values: ['23', 'true']},
    {key: 'answer', types: ['number'], values: ['42']},
    {key: 'help', args: ['help'], opts: [], defaultValues: ['foo', '--bar']},
    {key: 'verbose', types: ['bool'], values: ['false']},
    {key: 'version', types: [], values: [1]}
  ]

  const {errs} = demandACommand({opts})

  const exp = []

  expect(errs).toStrictEqual(exp)
})

test('demandACommand records no error if two commands are defined', () => {
  const opts = [
    {key: 'help', args: ['help'], opts: [], values: ['foo', '--bar']},
    {key: 'verbose', args: ['verbose'], opts: [], values: ['false']}
  ]

  const {errs} = demandACommand({opts})

  const exp = []

  expect(errs).toStrictEqual(exp)
})

test('demandACommand trows if opts is undefined', () => {
  const obj = {}

  const {errs} = demandACommand(obj)

  const exp = [
    commandRequired({options: []})
  ]

  expect(errs).toStrictEqual(exp)
})

test('demandACommand trows if input is undefined', () => {
  const {errs} = demandACommand()

  const exp = [
    commandRequired({options: []})
  ]

  expect(errs).toStrictEqual(exp)
})

test('demandACommand passes on errors', () => {
  const ERRS = ['foo']

  const {errs} = demandACommand({errs: ERRS})

  const exp = [
    ...ERRS,
    commandRequired({options: []})
  ]

  expect(errs).toStrictEqual(exp)
})