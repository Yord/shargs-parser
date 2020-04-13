const {commandsAsArrays} = require('..')

test('commandsAsArrays README example works', () => {
  const obj = {
    opts: [
      {key: 'heroes', types: null, args: ['-h'], array: true, values: ['Charles', 'Logan']}
    ]
  }

  const {opts} = commandsAsArrays(obj)

  const exp = [
    {key: 'heroes', types: ['string', 'string'], args: ['-h'], array: true, values: ['Charles', 'Logan']}
  ]

  expect(opts).toStrictEqual(exp)
})

test('commandsAsArrays works with defaultValues', () => {
  const obj = {
    opts: [
      {key: 'heroes', types: null, args: ['-h'], array: true, defaultValues: ['Charles', 'Logan']}
    ]
  }

  const {opts} = commandsAsArrays(obj)

  const exp = [
    {key: 'heroes', types: ['string', 'string'], args: ['-h'], array: true, defaultValues: ['Charles', 'Logan']}
  ]

  expect(opts).toStrictEqual(exp)
})