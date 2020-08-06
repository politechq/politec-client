import isEmail from './is-email'

test('Helpers :: isEmail -> Email validation', () => {
  expect(isEmail('to@azat.io')).toBe(true)
  expect(isEmail('test@localhost')).toBe(false)
  expect(isEmail('test_--@!.d')).toBe(false)
})
