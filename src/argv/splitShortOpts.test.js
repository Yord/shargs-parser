const {splitShortOpts} = require('..')

test('splitShortOpts README example works', () => {
  const obj = {argv: ['-ab']}

  const {argv} = splitShortOpts(obj)

  const exp = ['-a', '-b']

  expect(argv).toStrictEqual(exp)
})

test('splitShortOpts does not touch options with two dashes', () => {
  const obj = {argv: ['--ab']}

  const {argv} = splitShortOpts(obj)

  const exp = ['--ab']

  expect(argv).toStrictEqual(exp)
})

test('splitShortOpts does not touch options without dashes', () => {
  const obj = {argv: ['ab']}

  const {argv} = splitShortOpts(obj)

  const exp = ['ab']

  expect(argv).toStrictEqual(exp)
})

test('splitShortOpts works if argv is undefined', () => {
  const obj = {}

  const {argv} = splitShortOpts(obj)

  expect(argv).toStrictEqual([])
})

test('splitShortOpts works if input is undefined', () => {
  const {argv} = splitShortOpts()

  expect(argv).toStrictEqual([])
})

test('splitShortOpts passes on errors', () => {
  const ERRS = [{code: 'foo', msg: 'bar', info: {}}]

  const {errs} = splitShortOpts({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})