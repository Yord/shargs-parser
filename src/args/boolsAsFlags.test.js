const {boolsAsFlags} = require('..')

test('boolsAsFlags README example works', () => {
  const obj = {
    args: {
      _: [],
      html: false,
      version: true
    }
  }

  const {args} = boolsAsFlags(obj)

  const exp = {
    _: [],
    html: {type: 'flag', count: -1},
    version: {type: 'flag', count: 1}
  }

  expect(args).toStrictEqual(exp)
})