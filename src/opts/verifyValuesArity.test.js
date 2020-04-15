const {verifyValuesArity} = require('..')
const {invalidArity, invalidTypes, invalidValues} = require('../errors')

test('verifyValuesArity README example works', () => {
  const name = {key: 'name', types: ['string'], values: ['Charles', 'Francis']}
  const opts = [name]

  const {errs} = verifyValuesArity({opts})

  const exp = [
    invalidArity({option: name})
  ]

  expect(errs).toStrictEqual(exp)
})

test('verifyValuesArity does not throw for correct arities in values', () => {
  const opts = [
    {key: 'rest', values: ['foo']},
    {values: ['foo']},

    {key: 'string1', types: ['string'], values: ['string']},
    {key: 'string2', types: ['string'], values: [42]},
    {key: 'string3', types: ['string'], values: null},
    {key: 'string4', types: ['string'], values: undefined},
    {key: 'string5', types: ['string']},
    
    {key: 'numBool1', types: ['number', 'bool'], values: ['23', 'true']},
    {key: 'numBool2', types: ['number', 'bool'], values: [42, 42]},
    {key: 'numBool3', types: ['number', 'bool'], values: null},
    {key: 'numBool4', types: ['number', 'bool'], values: undefined},
    {key: 'numBool5', types: ['number', 'bool']},

    {key: 'answer1', types: ['number'], values: ['42']},
    {key: 'answer2', types: ['number'], values: [true]},
    {key: 'number3', types: ['number'], values: null},
    {key: 'number4', types: ['number'], values: undefined},
    {key: 'number5', types: ['number']},
    
    {key: 'verbose1', types: ['bool'], values: ['false']},
    {key: 'verbose2', types: ['bool'], values: [42]},
    {key: 'bool3', types: ['bool'], values: null},
    {key: 'bool4', types: ['bool'], values: undefined},
    {key: 'bool5', types: ['bool']},
    
    {key: 'flag1', types: [], values: [1]},
    {key: 'flag2', types: [], values: ['42']},
    {key: 'flag3', types: [], values: null},
    {key: 'flag4', types: [], values: undefined},
    {key: 'flag5', types: []},

    {key: 'help1', types: null, values: []},
    {key: 'help2', types: null, values: ['foo']},
    {key: 'help3', types: null, values: ['foo', '--bar']},
    {key: 'help4', types: null, values: ['foo', 42, 'baz']}
  ]

  const {errs} = verifyValuesArity({opts})

  const exp = []

  expect(errs).toStrictEqual(exp)
})

test('verifyValuesArity does not throw for correct arities in defaultValues', () => {
  const opts = [
    {key: 'rest', defaultValues: ['foo']},

    {key: 'string1', types: ['string'], defaultValues: ['string']},
    {key: 'string2', types: ['string'], defaultValues: [42]},
    {key: 'string3', types: ['string'], defaultValues: null},
    {key: 'string4', types: ['string'], defaultValues: undefined},
    
    {key: 'numBool1', types: ['number', 'bool'], defaultValues: ['23', 'true']},
    {key: 'numBool2', types: ['number', 'bool'], defaultValues: [42, 42]},
    {key: 'numBool3', types: ['number', 'bool'], defaultValues: null},
    {key: 'numBool4', types: ['number', 'bool'], defaultValues: undefined},

    {key: 'answer1', types: ['number'], defaultValues: ['42']},
    {key: 'answer2', types: ['number'], defaultValues: [true]},
    {key: 'number3', types: ['number'], defaultValues: null},
    {key: 'number4', types: ['number'], defaultValues: undefined},
    
    {key: 'verbose1', types: ['bool'], defaultValues: ['false']},
    {key: 'verbose2', types: ['bool'], defaultValues: [42]},
    {key: 'bool3', types: ['bool'], defaultValues: null},
    {key: 'bool4', types: ['bool'], defaultValues: undefined},
    
    {key: 'flag1', types: [], defaultValues: [1]},
    {key: 'flag2', types: [], defaultValues: ['42']},
    {key: 'flag3', types: [], defaultValues: null},
    {key: 'flag4', types: [], defaultValues: undefined},

    {key: 'help1', types: null, defaultValues: []},
    {key: 'help2', types: null, defaultValues: ['foo']},
    {key: 'help3', types: null, defaultValues: ['foo', '--bar']},
    {key: 'help4', types: null, defaultValues: ['foo', 42, 'baz']}
  ]

  const {errs} = verifyValuesArity({opts})

  const exp = []

  expect(errs).toStrictEqual(exp)
})

test('verifyValuesArity throws invalidArity error for incorrect arities for string, number, bool, and flag in values', () => {
  const string1 = {key: 'string1', types: ['string'], values: []}
  const string2 = {key: 'string2', types: ['string'], values: ['foo', 'bar']}
  const string3 = {key: 'string3', values: []}
  const string4 = {key: 'string4', values: ['foo', 'bar']}

  const number1 = {key: 'number1', types: ['number'], values: []}
  const number2 = {key: 'number2', types: ['number'], values: ['foo', 'bar']}
  const number3 = {key: 'number3', values: []}
  const number4 = {key: 'number4', values: ['foo', 'bar']}

  const bool1 = {key: 'bool1', types: ['bool'], values: []}
  const bool2 = {key: 'bool2', types: ['bool'], values: ['foo', 'bar']}
  const bool3 = {key: 'bool3', values: []}
  const bool4 = {key: 'bool4', values: ['foo', 'bar']}

  const flag1 = {key: 'flag1', types: [], values: []}
  const flag2 = {key: 'flag2', types: [], values: ['foo', 'bar']}
  const flag3 = {key: 'flag3', values: []}
  const flag4 = {key: 'flag4', values: ['foo', 'bar']}

  const opts = [
    string1, string2, string3, string4,
    number1, number2, number3, number4,
    bool1, bool2, bool3, bool4,
    flag1, flag2, flag3, flag4
  ]

  const {errs} = verifyValuesArity({opts})

  const exp = opts.map(option => invalidArity({option}))

  expect(errs).toStrictEqual(exp)
})

test('verifyValuesArity throws invalidArity error for incorrect arities for string, number, bool, and flag in defaultValues', () => {
  const string1 = {key: 'string1', types: ['string'], defaultValues: []}
  const string2 = {key: 'string2', types: ['string'], defaultValues: ['foo', 'bar']}
  const string3 = {key: 'string3', defaultValues: []}
  const string4 = {key: 'string4', defaultValues: ['foo', 'bar']}

  const number1 = {key: 'number1', types: ['number'], defaultValues: []}
  const number2 = {key: 'number2', types: ['number'], defaultValues: ['foo', 'bar']}
  const number3 = {key: 'number3', defaultValues: []}
  const number4 = {key: 'number4', defaultValues: ['foo', 'bar']}

  const bool1 = {key: 'bool1', types: ['bool'], defaultValues: []}
  const bool2 = {key: 'bool2', types: ['bool'], defaultValues: ['foo', 'bar']}
  const bool3 = {key: 'bool3', types: ['bool'], defaultValues: []}
  const bool4 = {key: 'bool4', types: ['bool'], defaultValues: ['foo', 'bar']}

  const flag1 = {key: 'flag1', types: [], defaultValues: []}
  const flag2 = {key: 'flag2', types: [], defaultValues: ['foo', 'bar']}
  const flag3 = {key: 'flag3', defaultValues: []}
  const flag4 = {key: 'flag4', defaultValues: ['foo', 'bar']}

  const opts = [
    string1, string2, string3, string4,
    number1, number2, number3, number4,
    bool1, bool2, bool3, bool4,
    flag1, flag2, flag3, flag4
  ]

  const {errs} = verifyValuesArity({opts})

  const exp = opts.map(option => invalidArity({option}))

  expect(errs).toStrictEqual(exp)
})

test('verifyValuesArity throws invalidValues error for incorrect values for string, number, bool, and flag in values', () => {
  const string1 = {key: 'string1', types: ['string'], values: 42}
  const string2 = {key: 'string2', types: ['string'], values: {foo: 42}}

  const number1 = {key: 'number1', types: ['number'], values: 42}
  const number2 = {key: 'number2', types: ['number'], values: {foo: 42}}

  const bool1 = {key: 'bool1', types: ['bool'], values: 42}
  const bool2 = {key: 'bool2', types: ['bool'], values: {foo: 42}}

  const flag1 = {key: 'flag1', types: [], values: 42}
  const flag2 = {key: 'flag2', types: [], values: {foo: 42}}

  const opts = [string1, string2, number1, number2, bool1, bool2, flag1, flag2]

  const {errs} = verifyValuesArity({opts})

  const exp = opts.map(option => invalidValues({values: option.values, option}))

  expect(errs).toStrictEqual(exp)
})

test('verifyValuesArity throws invalidValues error for incorrect values for string, number, bool, and flag in defaultValues', () => {
  const string1 = {key: 'string1', types: ['string'], defaultValues: 42}
  const string2 = {key: 'string2', types: ['string'], defaultValues: {foo: 42}}

  const number1 = {key: 'number1', types: ['number'], defaultValues: 42}
  const number2 = {key: 'number2', types: ['number'], defaultValues: {foo: 42}}

  const bool1 = {key: 'bool1', types: ['bool'], defaultValues: 42}
  const bool2 = {key: 'bool2', types: ['bool'], defaultValues: {foo: 42}}

  const flag1 = {key: 'flag1', types: [], defaultValues: 42}
  const flag2 = {key: 'flag2', types: [], defaultValues: {foo: 42}}

  const opts = [string1, string2, number1, number2, bool1, bool2, flag1, flag2]

  const {errs} = verifyValuesArity({opts})

  const exp = opts.map(option => invalidValues({defaultValues: option.defaultValues, option}))

  expect(errs).toStrictEqual(exp)
})

test('verifyValuesArity throws invalidTypes error for incorrect values for string, number, bool, and flag in values', () => {
  const string0 = {key: 'string', types: 42, values: ['foo']}
  const number0 = {key: 'number', types: 42, values: ['42']}
  const bool0 = {key: 'bool', types: 42, values: ['true']}
  const flag0 = {key: 'flag', types: 42, values: [1]}

  const opts = [string0, number0, bool0, flag0]

  const {errs} = verifyValuesArity({opts})

  const exp = opts.map(option => invalidTypes({types: option.types, option}))

  expect(errs).toStrictEqual(exp)
})

test('verifyValuesArity throws invalidTypes error for incorrect values for string, number, bool, and flag in defaultValues', () => {
  const string0 = {key: 'string', types: 42, defaultValues: ['foo']}
  const number0 = {key: 'number', types: 42, defaultValues: ['42']}
  const bool0 = {key: 'bool', types: 42, defaultValues: ['true']}
  const flag0 = {key: 'flag', types: 42, defaultValues: [1]}

  const opts = [string0, number0, bool0, flag0]

  const {errs} = verifyValuesArity({opts})

  const exp = opts.map(option => invalidTypes({types: option.types, option}))

  expect(errs).toStrictEqual(exp)
})

test('verifyValuesArity works if opts is undefined', () => {
  const obj = {}

  const {opts} = verifyValuesArity(obj)

  expect(opts).toStrictEqual([])
})

test('verifyValuesArity works if input is undefined', () => {
  const {opts} = verifyValuesArity()

  expect(opts).toStrictEqual([])
})

test('verifyValuesArity passes on errors', () => {
  const ERRS = ['foo']

  const {errs} = verifyValuesArity({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})