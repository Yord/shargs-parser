const {suggestOpts} = require('..')
const {didYouMean} = require('../errors')

test('suggestOpts README example works', () => {
  const age = {key: 'age', types: ['number'], args: ['-a', '--age']}

  const opts = [
    age,
    {values: ['--aeg']}
  ]

  const {errs} = suggestOpts({opts})

  const exp = [
    didYouMean({
      argv: '--aeg',
      options: [
        [],
        [],
        [{'--age': age}],
        [{'-a': age}]
      ]
    })
  ]

  expect(errs).toStrictEqual(exp)
})

test('suggestOpts works as expected', () => {
  const argv1 = '--titel'
  const argv2 = '--titl'
  const argv3 = '--beer'
  const title = {key: 'title', types: ['string'], args: ['-t', '--title']}
  const age   = {key: 'age', types: ['number'], args: ['--age', '-a']}
  const beef  = {key: 'age', types: ['bool'], args: ['--beef', '-b']}
  const pos   = {key: 'pos', types: ['string']}

  const opts = [
    beef,
    {values: [argv1]},
    title,
    {values: [argv2]},
    {values: [argv3]},
    age,
    pos
  ]

  const {errs} = suggestOpts({opts})

  const exp = [
    didYouMean({
      argv: argv1,
      options: [
        [],
        [],
        [{'--title': title}],
        [],
        [{'--beef': beef}, {'--age': age}],
        [{'-t': title}],
        [{'-b': beef}, {'-a': age}]
      ]
    }),
    didYouMean({
      argv: argv2,
      options: [
        [],
        [{'--title': title}],
        [],
        [],
        [{'--beef': beef}, {'-t': title}, {'--age': age}],
        [{'-b': beef}, {'-a': age}]
      ]
    }),
    didYouMean({
      argv: argv3,
      options: [
        [],
        [{'--beef': beef}],
        [],
        [{'--age': age}],
        [{'-b': beef}],
        [{'-t': title}, {'--title': title}, {'-a': age}]
      ]
    })
  ]

  expect(errs).toStrictEqual(exp)
})

test('suggestOpts works if opts is undefined', () => {
  const obj = {}

  const {opts} = suggestOpts(obj)

  expect(opts).toStrictEqual([])
})

test('suggestOpts works if input is undefined', () => {
  const {opts} = suggestOpts()

  expect(opts).toStrictEqual([])
})

test('suggestOpts passes on errors', () => {
  const ERRS = [{code: 'foo', msg: 'bar', info: {}}]

  const {errs} = suggestOpts({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})