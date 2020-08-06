import styled from 'styled-components'

import { compose, ifElse, prop } from 'ramda'

import { theme } from 'helpers'

const StyledValues = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: ${theme('inputBackground')};
  border: ${ifElse(
    prop('hasError'),
    compose(
      color => `1px solid ${color}`,
      theme('errorColor'),
    ),
    theme('border'),
  )};
  border-radius: 4px;
  width: 100%;
  min-height: 47px;
  padding: 16px 16px 6px;
  outline: 0;

  &:hover {
    transition: all 0.3s;
    border-color: ${theme('secondaryColor')};
  }
`

export default StyledValues
