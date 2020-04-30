const {boolAsFlag} = require('..')
const {pipe}       = require('../combinators/pipe')

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

test('boolAsFlag does not transform non-booleans', () => {
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
    boolAsFlag('title'),
    boolAsFlag('answer'),
    boolAsFlag('help'),
    boolAsFlag('version1'),
    boolAsFlag('no'),
    boolAsFlag('nono'),
    boolAsFlag('foo')
  )(obj)

  const exp = obj.args

  expect(args).toStrictEqual(exp)
})

test('boolAsFlag is recursive', () => {
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

  const {args} = boolAsFlag('version2')(obj)

  const exp = {
    _: [],
    title: "The Hitchhiker's Guide to the Galaxy",
    numBool: [23, true],
    command: {
      _: [],
      answer: 42,
      help: 'foo --bar',
      verbose: false,
      version1: {type: 'flag', count: 1},
      version2: {type: 'flag', count: 1}
    }
  }

  expect(args).toStrictEqual(exp)
})

test('boolAsFlag works if opts is undefined', () => {
  const obj = {}

  const {args} = boolAsFlag('foo')(obj)

  expect(args).toStrictEqual({_: []})
})

test('boolAsFlag works if input is undefined', () => {
  const {args} = boolAsFlag()()

  expect(args).toStrictEqual({_: []})
})