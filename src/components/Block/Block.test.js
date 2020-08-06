import React from 'react'
import ReactDOM from 'react-dom'
import Block from './Block'

test('Component :: Block -> Renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Block />, div)
})
