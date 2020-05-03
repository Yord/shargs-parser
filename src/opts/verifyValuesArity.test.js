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
    
    {key: 'flag1', args: ['-f'], types: [], values: [1]},
    {key: 'flag2', args: ['-f'], types: [], values: ['42']},
    {key: 'flag3', args: ['-f'], types: [], values: null},
    {key: 'flag4', args: ['-f'], types: [], values: undefined},
    {key: 'flag5', args: ['-f'], types: []},

    {key: 'help1', values: []},
    {key: 'help2', values: ['foo']},
    {key: 'help3', values: ['foo', '--bar']},
    {key: 'help4', values: ['foo', 42, 'baz']}
  ]

  const {errs} = verifyValuesArity({opts})

  const exp = []

  expect(errs).toStrictEqual(exp)
})

test('verifyValuesArity does not throw for correct arities in defaultValues', () => {
  const opts = [
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
    
    {key: 'flag1', args: ['-f'], types: [], defaultValues: [1]},
    {key: 'flag2', args: ['-f'], types: [], defaultValues: ['42']},
    {key: 'flag3', args: ['-f'], types: [], defaultValues: null},
    {key: 'flag4', args: ['-f'], types: [], defaultValues: undefined},

    {key: 'help1', defaultValues: []},
    {key: 'help2', defaultValues: ['foo']},
    {key: 'help3', defaultValues: ['foo', '--bar']},
    {key: 'help4', defaultValues: ['foo', 42, 'baz']}
  ]

  const {errs} = verifyValuesArity({opts})

  const exp = []

  expect(errs).toStrictEqual(exp)
})

test('verifyValuesArity throws invalidArity error for incorrect arities in values', () => {
  const rest1 = {values: ['foo', 'bar']}
  const rest2 = {values: []}

  const string1 = {key: 'string1', types: ['string'], values: []}
  const string2 = {key: 'string2', types: ['string'], values: ['foo', 'bar']}
  const string3 = {key: 'string3', types: ['string'], values: []}
  const string4 = {key: 'string4', types: ['string'], values: ['foo', 'bar']}

  const number1 = {key: 'number1', types: ['number'], values: []}
  const number2 = {key: 'number2', types: ['number'], values: ['foo', 'bar']}
  const number3 = {key: 'number3', types: ['number'], values: []}
  const number4 = {key: 'number4', types: ['number'], values: ['foo', 'bar']}

  const bool1 = {key: 'bool1', types: ['bool'], values: []}
  const bool2 = {key: 'bool2', types: ['bool'], values: ['foo', 'bar']}
  const bool3 = {key: 'bool3', types: ['bool'], values: []}
  const bool4 = {key: 'bool4', types: ['bool'], values: ['foo', 'bar']}

  const flag1 = {key: 'flag1', args: ['-f'], types: [], values: []}
  const flag2 = {key: 'flag2', args: ['-f'], types: [], values: ['foo', 'bar']}
  const flag3 = {key: 'flag3', args: ['-f'], types: [], values: []}
  const flag4 = {key: 'flag4', args: ['-f'], types: [], values: ['foo', 'bar']}

  const array1 = {key: 'array1', types: ['bool', 'string'], values: []}
  const array2 = {key: 'array2', types: ['bool', 'string'], values: ['foo']}

  const opts = [
    rest1, rest2,
    string1, string2, string3, string4,
    number1, number2, number3, number4,
    bool1, bool2, bool3, bool4,
    flag1, flag2, flag3, flag4,
    array1, array2
  ]

  const {errs} = verifyValuesArity({opts})

  const exp = opts.map(option => invalidArity({option}))

  expect(errs).toStrictEqual(exp)
})

test('verifyValuesArity throws invalidArity error for incorrect arities in defaultValues', () => {
  const string1 = {key: 'string1', types: ['string'], defaultValues: []}
  const string2 = {key: 'string2', types: ['string'], defaultValues: ['foo', 'bar']}
  const string3 = {key: 'string3', types: ['string'], defaultValues: []}
  const string4 = {key: 'string4', types: ['string'], defaultValues: ['foo', 'bar']}

  const number1 = {key: 'number1', types: ['number'], defaultValues: []}
  const number2 = {key: 'number2', types: ['number'], defaultValues: ['foo', 'bar']}
  const number3 = {key: 'number3', types: ['number'], defaultValues: []}
  const number4 = {key: 'number4', types: ['number'], defaultValues: ['foo', 'bar']}

  const bool1 = {key: 'bool1', types: ['bool'], defaultValues: []}
  const bool2 = {key: 'bool2', types: ['bool'], defaultValues: ['foo', 'bar']}
  const bool3 = {key: 'bool3', types: ['bool'], defaultValues: []}
  const bool4 = {key: 'bool4', types: ['bool'], defaultValues: ['foo', 'bar']}

  const flag1 = {key: 'flag1', args: ['-f'], types: [], defaultValues: []}
  const flag2 = {key: 'flag2', args: ['-f'], types: [], defaultValues: ['foo', 'bar']}
  const flag3 = {key: 'flag3', args: ['-f'], types: [], defaultValues: []}
  const flag4 = {key: 'flag4', args: ['-f'], types: [], defaultValues: ['foo', 'bar']}

  const array1 = {key: 'array1', types: ['bool', 'string'], defaultValues: []}
  const array2 = {key: 'array2', types: ['bool', 'string'], defaultValues: ['foo']}

  const opts = [
    string1, string2, string3, string4,
    number1, number2, number3, number4,
    bool1, bool2, bool3, bool4,
    flag1, flag2, flag3, flag4,
    array1, array2
  ]

  const {errs} = verifyValuesArity({opts})

  const exp = opts.map(option => invalidArity({option}))

  expect(errs).toStrictEqual(exp)
})

test('verifyValuesArity throws invalidValues error for incorrect values in values', () => {
  const rest1 = {values: [1]}
  const rest2 = {values: '1'}
  const rest3 = {values: {foo: 42}}

  const string1 = {key: 'string1', types: ['string'], values: 42}
  const string2 = {key: 'string2', types: ['string'], values: {foo: 42}}

  const number1 = {key: 'number1', types: ['number'], values: 42}
  const number2 = {key: 'number2', types: ['number'], values: {foo: 42}}

  const bool1 = {key: 'bool1', types: ['bool'], values: 42}
  const bool2 = {key: 'bool2', types: ['bool'], values: {foo: 42}}

  const flag1 = {key: 'flag1', types: [], values: 42}
  const flag2 = {key: 'flag2', types: [], values: {foo: 42}}

  const opts = [undefined, rest1, rest2, rest3, string1, string2, number1, number2, bool1, bool2, flag1, flag2]

  // @ts-ignore
  const {errs} = verifyValuesArity({opts})

  const exp = opts.slice(1).map(option => invalidValues({values: option.values, option}))

  expect(errs).toStrictEqual(exp)
})

test('verifyValuesArity throws invalidValues error for incorrect values in defaultValues', () => {
  const rest1 = {defaultValues: []}
  const rest2 = {defaultValues: ['1']}
  const rest3 = {defaultValues: ['1', '2']}

  const string1 = {key: 'string1', types: ['string'], defaultValues: 42}
  const string2 = {key: 'string2', types: ['string'], defaultValues: {foo: 42}}

  const number1 = {key: 'number1', types: ['number'], defaultValues: 42}
  const number2 = {key: 'number2', types: ['number'], defaultValues: {foo: 42}}

  const bool1 = {key: 'bool1', types: ['bool'], defaultValues: 42}
  const bool2 = {key: 'bool2', types: ['bool'], defaultValues: {foo: 42}}

  const flag1 = {key: 'flag1', types: [], defaultValues: 42}
  const flag2 = {key: 'flag2', types: [], defaultValues: {foo: 42}}

  const opts = [rest1, rest2, rest3, string1, string2, number1, number2, bool1, bool2, flag1, flag2]

  const {errs} = verifyValuesArity({opts})

  const exp = opts.map(option => invalidValues({defaultValues: option.defaultValues, option}))

  expect(errs).toStrictEqual(exp)
})

test('verifyValuesArity throws invalidTypes error for incorrect values in values', () => {
  const string0 = {key: 'string', types: 42, values: ['foo']}
  const number0 = {key: 'number', types: 42, values: ['42']}
  const bool0 = {key: 'bool', types: 42, values: ['true']}
  const flag0 = {key: 'flag', types: 42, values: [1]}

  const opts = [string0, number0, bool0, flag0]

  // @ts-ignore
  const {errs} = verifyValuesArity({opts})

  const exp = opts.map(option => invalidTypes({types: option.types, option}))

  expect(errs).toStrictEqual(exp)
})

test('verifyValuesArity throws invalidTypes error for incorrect values in defaultValues', () => {
  const string0 = {key: 'string', types: 42, defaultValues: ['foo']}
  const number0 = {key: 'number', types: 42, defaultValues: ['42']}
  const bool0 = {key: 'bool', types: 42, defaultValues: ['true']}
  const flag0 = {key: 'flag', types: 42, defaultValues: [1]}

  const opts = [string0, number0, bool0, flag0]

  // @ts-ignore
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
  const ERRS = [{code: 'foo', msg: 'bar', info: {}}]

  const {errs} = verifyValuesArity({errs: ERRS})

  expect(errs).toStrictEqual(ERRS)
})