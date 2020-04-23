const {flagAsNumber} = require('..')
const pipe = require('../combinators/pipe')

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

test('flagAsNumber does not transform non-flags', () => {
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
    flagAsNumber('title'),
    flagAsNumber('numBool'),
    flagAsNumber('answer'),
    flagAsNumber('help'),
    flagAsNumber('verbose'),
    flagAsNumber('version2'),
    flagAsNumber('no'),
    flagAsNumber('nono'),
    flagAsNumber('foo')
  )(obj)

  const exp = obj.args

  expect(args).toStrictEqual(exp)
})

test('flagAsNumber is recursive', () => {
  const obj = {
    args: {
      title: "The Hitchhiker's Guide to the Galaxy",
      numBool: [23, true],
      command: {
        answer: 42,
        help: 'foo --bar',
        verbose: false,
        version: {type: 'flag', count: 1}
      }
    }
  }

  const {args} = flagAsNumber('version')(obj)

  const exp = {
    title: "The Hitchhiker's Guide to the Galaxy",
    numBool: [23, true],
    command: {
      answer: 42,
      help: 'foo --bar',
      verbose: false,
      version: 1
    }
  }

  expect(args).toStrictEqual(exp)
})

test('flagAsNumber works if opts is undefined', () => {
  const obj = {}

  const {args} = flagAsNumber('foo')(obj)

  expect(args).toStrictEqual({_: []})
})

test('flagAsNumber works if input is undefined', () => {
  const {args} = flagAsNumber()()

  expect(args).toStrictEqual({_: []})
})

test('flagAsNumber passes on errors', () => {
  const ERRS = ['foo']

  const {errs} = flagAsNumber('bar')({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})