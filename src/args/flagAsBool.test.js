const {flagAsBool} = require('..')

test('flagAsBool README example works', () => {
  const obj = {
    args: {
      version: {type: 'flag', count: 1}
    }
  }

  const {args} = flagAsBool('version')(obj)

  const exp = {
    version: true
  }

  expect(args).toStrictEqual(exp)
})