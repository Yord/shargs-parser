const {demandASubcommand} = require('..')
const {subcommandRequired} = require('../errors')

test('demandASubcommand README example works', () => {
  const opts = [
    {key: 'title', types: ['string'], values: ["The Hitchhiker's Guide to the Galaxy"]},
    {key: 'numBool', types: ['number', 'bool'], values: ['23', 'true']},
    {key: 'answer', types: ['number'], values: ['42']},
    {key: 'verbose', types: ['bool'], values: ['false']},
    {key: 'version', types: [], values: [1]}
  ]

  const {errs} = demandASubcommand({opts})

  const exp = [
    subcommandRequired({options: opts})
  ]

  expect(errs).toStrictEqual(exp)
})

test('demandASubcommand records no error if a command has values', () => {
  const opts = [
    {key: 'title', types: ['string'], values: ["The Hitchhiker's Guide to the Galaxy"]},
    {key: 'numBool', types: ['number', 'bool'], values: ['23', 'true']},
    {key: 'answer', types: ['number'], values: ['42']},
    {key: 'help', args: ['help'], opts: [], values: ['foo', '--bar']},
    {key: 'verbose', types: ['bool'], values: ['false']},
    {key: 'version', types: [], values: [1]}
  ]

  const {errs} = demandASubcommand({opts})

  const exp = []

  expect(errs).toStrictEqual(exp)
})

test('demandASubcommand records no error if two commands are defined', () => {
  const opts = [
    {key: 'help', args: ['help'], opts: [], values: ['foo', '--bar']},
    {key: 'verbose', args: ['verbose'], opts: [], values: ['false']}
  ]

  const {errs} = demandASubcommand({opts})

  const exp = []

  expect(errs).toStrictEqual(exp)
})

test('demandASubcommand trows if opts is undefined', () => {
  const obj = {}

  const {errs} = demandASubcommand(obj)

  const exp = [
    subcommandRequired({options: []})
  ]

  expect(errs).toStrictEqual(exp)
})

test('demandASubcommand trows if input is undefined', () => {
  const {errs} = demandASubcommand()

  const exp = [
    subcommandRequired({options: []})
  ]

  expect(errs).toStrictEqual(exp)
})

test('demandASubcommand passes on errors', () => {
  const ERRS = [{code: 'foo', msg: 'bar', info: {}}]

  const {errs} = demandASubcommand({errs: ERRS})

  const exp = [
    ...ERRS,
    subcommandRequired({options: []})
  ]

  expect(errs).toStrictEqual(exp)
})