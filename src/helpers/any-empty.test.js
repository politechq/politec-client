import anyEmpty from './any-empty'

test('Helpers :: allNotEmpty -> All args are empty', () => {
  expect(anyEmpty([''])).toBe(true)
  expect(anyEmpty([null])).toBe(true)
  expect(anyEmpty(['', '', ''])).toBe(true)
  expect(anyEmpty(['', null, undefined])).toBe(true)
})

test('Helpers :: allNotEmpty -> Some args are empty', () => {
  expect(anyEmpty(['test', '', ''])).toBe(true)
  expect(anyEmpty(['', 'test', ''])).toBe(true)
  expect(anyEmpty([null, 'test'])).toBe(true)
})

test('Helpers :: allNotEmpty -> No args are empty', () => {
  expect(anyEmpty(['test'])).toBe(false)
  expect(anyEmpty(['test', 'test'])).toBe(false)
})
