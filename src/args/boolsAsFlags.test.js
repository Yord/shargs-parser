const {boolsAsFlags} = require('..')

test('boolsAsFlags README example works', () => {
  const obj = {
    args: {
      _: [],
      html: false,
      version: true
    }
  }

  const {args} = boolsAsFlags(obj)

  const exp = {
    _: [],
    html: {type: 'flag', count: -1},
    version: {type: 'flag', count: 1}
  }

  expect(args).toStrictEqual(exp)
})

test('boolsAsFlags works as expected on all types', () => {
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

  const {args} = boolsAsFlags(obj)

  const exp = {
    _: [],
    title: "The Hitchhiker's Guide to the Galaxy",
    numBool: [23, true],
    answer: 42,
    help: 'foo --bar',
    verbose: {type: 'flag', count: -1},
    version1: {type: 'flag', count: 1},
    version2: {type: 'flag', count: 1},
    no: undefined,
    nono: null
  }

  expect(args).toStrictEqual(exp)
})

test('boolsAsFlags is recursive', () => {
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

  const {args} = boolsAsFlags(obj)

  const exp = {
    _: [],
    title: "The Hitchhiker's Guide to the Galaxy",
    numBool: [23, true],
    command: {
      _: [],
      answer: 42,
      help: 'foo --bar',
      verbose: {type: 'flag', count: -1},
      version1: {type: 'flag', count: 1},
      version2: {type: 'flag', count: 1}
    }
  }

  expect(args).toStrictEqual(exp)
})