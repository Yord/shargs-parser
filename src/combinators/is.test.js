const is = require('./is')

test('is checks for interfaces', () => {
  const a = {a: a => a === 42}
  const b = {b: b => b === true}

  const obj = {a: 42, b: true}

  const res = is(a, b)(obj)

  const exp = true

  expect(res).toStrictEqual(exp)
})

test('is works on empty objects', () => {
  const a = {a: a => a === 42}
  const b = {b: b => b === true}

  const obj = {}

  const res = is(a, b)(obj)

  const exp = false

  expect(res).toStrictEqual(exp)
})

test('is returns false for input that is not a function', () => {
  const a = {a: 42}

  const obj = {}

  const res = is(a)(obj)

  const exp = false

  expect(res).toStrictEqual(exp)
})