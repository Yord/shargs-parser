const {splitShortOptions} = require('..')

test('splitShortOptions README example works', () => {
  const obj = {argv: ['-ab']}

  const {argv} = splitShortOptions(obj)

  const exp = ['-a', '-b']

  expect(argv).toStrictEqual(exp)
})

test('splitShortOptions does not touch options with two dashes', () => {
  const obj = {argv: ['--ab']}

  const {argv} = splitShortOptions(obj)

  const exp = ['--ab']

  expect(argv).toStrictEqual(exp)
})

test('splitShortOptions does not touch options without dashes', () => {
  const obj = {argv: ['ab']}

  const {argv} = splitShortOptions(obj)

  const exp = ['ab']

  expect(argv).toStrictEqual(exp)
})

test('splitShortOptions works if argv is undefined', () => {
  const obj = {}

  const {argv} = splitShortOptions(obj)

  expect(argv).toStrictEqual([])
})

test('splitShortOptions works if input is undefined', () => {
  const {argv} = splitShortOptions()

  expect(argv).toStrictEqual([])
})

test('splitShortOptions passes on errors', () => {
  const ERRS = [{code: 'foo', msg: 'bar', info: {}}]

  const {errs} = splitShortOptions({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})