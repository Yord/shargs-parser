const {flagAsNumber} = require('..')

test('flagAsNumber README example works', () => {
  const obj = {
    args: {
      version: {type: 'flag', count: 2}
    }
  }

  const {args} = flagAsNumber('version')(obj)

  const exp = {
    version: 2
  }

  expect(args).toStrictEqual(exp)
})

test('flagAsNumber works as expected on all types', () => {
  const obj = {
    args: {
      title: "The Hitchhiker's Guide to the Galaxy",
      numBool: [23, true],
      answer: 42,
      help: 'foo --bar',
      verbose: false,
      version: {type: 'flag', count: 1},
      no: undefined,
      nono: null
    }
  }

  const {args} = flagAsNumber('version')(obj)

  const exp = {
    title: "The Hitchhiker's Guide to the Galaxy",
    numBool: [23, true],
    answer: 42,
    help: 'foo --bar',
    verbose: false,
    version: 1,
    no: undefined,
    nono: null
  }

  expect(args).toStrictEqual(exp)
})