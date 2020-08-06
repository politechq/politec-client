import isJwt from './is-jwt'

test('Helpers :: isJwt -> Jwt validation', () => {
  expect(isJwt(null)).toBe(false)
  expect(isJwt('string')).toBe(false)
  expect(
    isJwt(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJkcmFrZUBnbWFpbC5jb20iLCJpYXQiOjE1OTYwNDc1MjIsImV4cCI6MTU5NjA0OTMyMn0.d-_-e7opFW3MdAR3uDvctYdDKjAdV0bEiOF0ykBdEa8',
    ),
  ).toBe(true)
})
