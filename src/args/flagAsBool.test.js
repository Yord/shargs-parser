const {flagAsBool} = require('..')
const {pipe}       = require('../combinators/pipe')

test('flagAsBool README example works', () => {
  const obj = {
    args: {
      _: [],
      version: {type: 'flag', count: 1}
    }
  }

  const {args} = flagAsBool('version')(obj)

  const exp = {
    _: [],
    version: true
  }

  expect(args).toStrictEqual(exp)
})

test('flagAsBool works as expected on all types', () => {
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

  const {args} = flagAsBool('version1')(obj)

  const exp = {
    _: [],
    title: "The Hitchhiker's Guide to the Galaxy",
    numBool: [23, true],
    answer: 42,
    help: 'foo --bar',
    verbose: false,
    version1: true,
    version2: true,
    no: undefined,
    nono: null
  }

  expect(args).toStrictEqual(exp)
})

test('flagAsBool does not transform non-flags', () => {
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
    flagAsBool('title'),
    flagAsBool('numBool'),
    flagAsBool('answer'),
    flagAsBool('help'),
    flagAsBool('verbose'),
    flagAsBool('version2'),
    flagAsBool('no'),
    flagAsBool('nono'),
    flagAsBool('foo')
  )(obj)

  const exp = obj.args

  expect(args).toStrictEqual(exp)
})

test('flagAsBool is recursive', () => {
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

  const {args} = flagAsBool('version1')(obj)

  const exp = {
    _: [],
    title: "The Hitchhiker's Guide to the Galaxy",
    numBool: [23, true],
    command: {
      _: [],
      answer: 42,
      help: 'foo --bar',
      verbose: false,
      version1: true,
      version2: true
    }
  }

  expect(args).toStrictEqual(exp)
})

test('flagAsBool works if opts is undefined', () => {
  const obj = {}

  const {args} = flagAsBool('foo')(obj)

  expect(args).toStrictEqual({_: []})
})

test('flagAsBool works if input is undefined', () => {
  const {args} = flagAsBool()()

  expect(args).toStrictEqual({_: []})
})

test('flagAsBool passes on errors', () => {
  const ERRS = [{code: 'foo', msg: 'bar', info: {}}]

  const {errs} = flagAsBool('bar')({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})