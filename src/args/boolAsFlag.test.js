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

test('boolAsFlag works as expected on all types', () => {
  const obj = {
    args: {
      _: [],
      title: "The Hitchhiker's Guide to the Galaxy",
      numBool: [23, true],
      answer: 42,
      help: 'foo --bar',
      verbose: false,
      version1: {type: 'flag', count: 1},
      version2: true,
      no: undefined,
      nono: null
    }
  }

  const {args} = boolAsFlag('verbose')(obj)

  const exp = {
    _: [],
    title: "The Hitchhiker's Guide to the Galaxy",
    numBool: [23, true],
    answer: 42,
    help: 'foo --bar',
    verbose: {type: 'flag', count: -1},
    version1: {type: 'flag', count: 1},
    version2: true,
    no: undefined,
    nono: null
  }

  expect(args).toStrictEqual(exp)
})