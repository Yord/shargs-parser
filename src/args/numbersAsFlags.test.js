const {numbersAsFlags} = require('..')

test('numbersAsFlags README example works', () => {
  const obj = {
    args: {
      _: [],
      answer: 42
    }
  }

  const {args} = numbersAsFlags(obj)

  const exp = {
    _: [],
    answer: {type: 'flag', count: 42}
  }

  expect(args).toStrictEqual(exp)
})