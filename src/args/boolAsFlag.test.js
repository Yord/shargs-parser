const {boolAsFlag} = require('..')

test('boolAsFlag README example works', () => {
  const obj = {
    args: {
      _: [],
      version: true
    }
  }

  const {args} = boolAsFlag('version')(obj)

  const exp = {
    _: [],
    version: {type: 'flag', count: 1}
  }

  expect(args).toStrictEqual(exp)
})