const {anything, assert, func, property} = require('fast-check')
const compose = require('./compose')

test('compose composes functions', () => {
  const f = func(anything())
  const g = func(anything())
  const a = anything()
  assert(
    property(f, g, a, (f, g, a) => {
      expect(
        compose(f, g)(a)
      ).toStrictEqual(
        f(g(a))
      )
    })
  )
})