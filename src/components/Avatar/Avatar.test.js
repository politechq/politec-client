import React from 'react'
import { render } from '@testing-library/react'
import Avatar from './Avatar'

test('Component :: Avatar -> Renders without crashing', () => {
  render(<Avatar />)
})

test('Component :: Avatar -> Render default image if avatar src doesn\'t exists', () => {
  const { container } = render(<Avatar />)
  const img = container.querySelector('img')
  const getUrlPathname = url => new URL(url).pathname
  expect(getUrlPathname(img.src)).toBe('/default.png')
})

test('Component :: Avatar -> Has alt attribute', () => {
  const { container } = render(<Avatar />)
  const img = container.querySelector('img')
  expect(img).toHaveAttribute('alt', 'avatar')
})
