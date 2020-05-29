const {setDefaultValues} = require('..')

test('setDefaultValues README example works', () => {
  const obj = {
    opts: [
      {key: 'flag', args: ['-f'], types: [],       defaultValues: [1]},
      {key: 'bool', args: ['-b'], types: ['bool'], defaultValues: ['true'], values: ['false']}
    ]
  }

  const {opts} = setDefaultValues(obj)

  const exp = [
    {key: 'flag', args: ['-f'], types: [],       defaultValues: [1],      values: [1]},
    {key: 'bool', args: ['-b'], types: ['bool'], defaultValues: ['true'], values: ['false']}
  ]

  expect(opts).toStrictEqual(exp)
})