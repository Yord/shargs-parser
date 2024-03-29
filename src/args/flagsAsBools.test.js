const {flagsAsBools} = require('..')

test('flagsAsBools README example works', () => {
  const obj = {
    args: {
      _: [],
      version: {type: 'flag', count: 1}
    }
  }

  const {args} = flagsAsBools(obj)

  const exp = {
    _: [],
    version: true
  }

  expect(args).toStrictEqual(exp)
})

test('flagsAsBools works as expected on all types', () => {
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

  const {args} = flagsAsBools(obj)

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

test('flagsAsBools is recursive', () => {
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

  const {args} = flagsAsBools(obj)

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

test('flagsAsBools works if opts is undefined', () => {
  const obj = {}

  const {args} = flagsAsBools(obj)

  expect(args).toStrictEqual({_: []})
})

test('flagsAsBools works if input is undefined', () => {
  const {args} = flagsAsBools()

  expect(args).toStrictEqual({_: []})
})

test('flagsAsBools passes on errors', () => {
  const ERRS = [{code: 'foo', msg: 'bar', info: {}}]

  const {errs} = flagsAsBools({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})