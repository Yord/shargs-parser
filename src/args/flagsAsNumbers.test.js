const {flagsAsNumbers} = require('..')

test('flagsAsNumbers README example works', () => {
  const obj = {
    args: {
      _: [],
      version: {type: 'flag', count: 2}
    }
  }

  const {args} = flagsAsNumbers(obj)

  const exp = {
    _: [],
    version: 2
  }

  expect(args).toStrictEqual(exp)
})

test('flagsAsNumbers works as expected on all types', () => {
  const obj = {
    args: {
      _: [],
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

  const {args} = flagsAsNumbers(obj)

  const exp = {
    _: [],
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

test('flagsAsNumbers is recursive', () => {
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
        version: {type: 'flag', count: 1}
      }
    }
  }

  const {args} = flagsAsNumbers(obj)

  const exp = {
    _: [],
    title: "The Hitchhiker's Guide to the Galaxy",
    numBool: [23, true],
    command: {
      _: [],
      answer: 42,
      help: 'foo --bar',
      verbose: false,
      version: 1
    }
  }

  expect(args).toStrictEqual(exp)
})

test('flagsAsNumbers works if opts is undefined', () => {
  const obj = {}

  const {args} = flagsAsNumbers(obj)

  expect(args).toStrictEqual({_: []})
})

test('flagsAsNumbers works if input is undefined', () => {
  const {args} = flagsAsNumbers()

  expect(args).toStrictEqual({_: []})
})

test('flagsAsNumbers passes on errors', () => {
  const ERRS = [{code: 'foo', msg: 'bar', info: {}}]

  const {errs} = flagsAsNumbers({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})