import theme from './theme'

const props = {
  theme: {
    background: 'yellow',
    color: 'red',
  },
}

test('Helpers :: theme -> Get theme variable', () => {
  expect(theme('color', props)).toBe('red')
  expect(theme('background', props)).toBe('yellow')
})
