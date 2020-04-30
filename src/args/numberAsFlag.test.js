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

test('numberAsFlag works as expected on all types', () => {
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

  const {args} = numberAsFlag('answer')(obj)

  const exp = {
    _: [],
    title: "The Hitchhiker's Guide to the Galaxy",
    numBool: [23, true],
    answer: {type: 'flag', count: 42},
    help: 'foo --bar',
    verbose: false,
    version1: {type: 'flag', count: 1},
    version2: true,
    no: undefined,
    nono: null
  }

  expect(args).toStrictEqual(exp)
})