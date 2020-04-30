const {numberAsFlag} = require('..')
const {pipe}       = require('../combinators/pipe')

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

test('numberAsFlag does not transform non-numbers', () => {
  const obj = {
    args: {
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

  const {args} = pipe(
    numberAsFlag('title'),
    numberAsFlag('numBool'),
    numberAsFlag('help'),
    numberAsFlag('verbose'),
    numberAsFlag('version1'),
    numberAsFlag('version2'),
    numberAsFlag('no'),
    numberAsFlag('nono'),
    numberAsFlag('foo')
  )(obj)

  const exp = obj.args

  expect(args).toStrictEqual(exp)
})

test('numberAsFlag is recursive', () => {
  const obj = {
    args: {
      _: [],
      title: "The Hitchhiker's Guide to the Galaxy",
      numBool: [23, true],
      command: {
        _: [],
        answer: 42,
        help: 'foo --bar',
        verbose: false,
        version1: {type: 'flag', count: 1},
        version2: true
      }
    }
  }

  const {args} = numberAsFlag('answer')(obj)

  const exp = {
    _: [],
    title: "The Hitchhiker's Guide to the Galaxy",
    numBool: [23, true],
    command: {
      _: [],
      answer: {type: 'flag', count: 42},
      help: 'foo --bar',
      verbose: false,
      version1: {type: 'flag', count: 1},
      version2: true
    }
  }

  expect(args).toStrictEqual(exp)
})

test('numberAsFlag works if opts is undefined', () => {
  const obj = {}

  const {args} = numberAsFlag('foo')(obj)

  expect(args).toStrictEqual({_: []})
})

test('numberAsFlag works if input is undefined', () => {
  const {args} = numberAsFlag()()

  expect(args).toStrictEqual({_: []})
})