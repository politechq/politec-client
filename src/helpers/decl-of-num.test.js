import declOfNum from './decl-of-num'

test('Helpers :: declOfNum -> Get word form by number', () => {
  expect(declOfNum(1, ['минута', 'минуты', 'минут'])).toBe('минута')
  expect(declOfNum(2, ['минута', 'минуты', 'минут'])).toBe('минуты')
  expect(declOfNum(5, ['минута', 'минуты', 'минут'])).toBe('минут')
})
