import styled from 'styled-components'

import { compose, ifElse, prop } from 'ramda'

import { theme } from 'helpers'

const StyledInput = styled.input`
  font-size: 15px;
  color: inherit;
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
  padding: 22px 16px 6px;
  outline: 0;

  &:hover,
  &:focus {
    transition: all 0.4s;
    border-color: ${theme('primaryColor')};
  }

  &:focus,
  &:valid {
    ~ label {
      font-size: 11px;
      top: 8px;
    }
  }

  /* stylelint-disable */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${theme('inputBackground')} inset !important;
    -webkit-text-fill-color: ${theme('textColor')} !important;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`

export default StyledInput
