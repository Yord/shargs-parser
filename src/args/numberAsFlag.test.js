const {numberAsFlag} = require('..')

test('numberAsFlag README example works', () => {
  const obj = {
    args: {
      _: [],
      answer: 42
    }
  }

  const {args} = numberAsFlag('answer')(obj)

  const exp = {
    _: [],
    answer: {type: 'flag', count: 42}
  }

  expect(args).toStrictEqual(exp)
})