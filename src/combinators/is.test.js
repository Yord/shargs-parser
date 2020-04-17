const is = require('./is')

test('is checks for interfaces', () => {
  const a = {a: a => a === 42}
  const b = {b: b => b === true}

  const obj = {a: 42, b: true}

  const res = is(a, b)(obj)

  const exp = true

  expect(res).toStrictEqual(exp)
})