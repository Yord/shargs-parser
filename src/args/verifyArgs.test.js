const {verifyArgs} = require('..')
const {falseArgsRules, wrongArgsRulesType} = require('../errors')

test('verifyArgs README example works', () => {
  const rules = args => (
    typeof args.firstName !== 'undefined' &&
    typeof args.lastName  !== 'undefined'
  )

  const args = {
    _: [],
    firstName: 'Logan'
  }

  const {errs} = verifyArgs(rules)({args})

  const exp = [
    falseArgsRules({rules, args})
  ]

  expect(errs).toStrictEqual(exp)
})

test('verifyArgs README example works', () => {
  const rules = 42

  const args = {
    _: [],
    firstName: 'Logan'
  }

  // @ts-ignore
  const {errs} = verifyArgs(rules)({args})

  const exp = [
    wrongArgsRulesType({type: 'number', args})
  ]

  expect(errs).toStrictEqual(exp)
})

test('verifyArgs works if opts is undefined', () => {
  const obj = {}

  const {args} = verifyArgs()(obj)

  expect(args).toStrictEqual([])
})

test('verifyArgs works if input is undefined', () => {
  const {args} = verifyArgs()()

  expect(args).toStrictEqual([])
})

test('verifyArgs passes on errors', () => {
  const ERRS = [{code: 'foo', msg: 'bar', info: {}}]

  const {errs} = verifyArgs()({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})