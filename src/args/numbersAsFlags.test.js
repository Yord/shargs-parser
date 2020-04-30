const {numbersAsFlags} = require('..')

test('numbersAsFlags README example works', () => {
  const obj = {
    args: {
      _: [],
      answer: 42
    }
  }

  const {args} = numbersAsFlags(obj)

  const exp = {
    _: [],
    answer: {type: 'flag', count: 42}
  }

  expect(args).toStrictEqual(exp)
})

test('numbersAsFlags works as expected on all types', () => {
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

  const {args} = numbersAsFlags(obj)

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

test('numbersAsFlags is recursive', () => {
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

  const {args} = numbersAsFlags(obj)

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