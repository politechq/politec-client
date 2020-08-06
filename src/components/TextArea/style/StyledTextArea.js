import styled from 'styled-components'

import { prop } from 'ramda'

import { theme } from 'helpers'

const StyledTextArea = styled.textarea`
  display: flex;
  font-size: 15px;
  color: inherit;
  background: ${theme('inputBackground')};
  border: ${theme('border')};
  border-radius: 4px;
  width: 100%;
  padding: 22px 16px 6px;
  resize: ${prop('resize')};
  outline: 0;

  &:hover,
  &:focus {
    transition: all 0.3s;
    border-color: ${theme('secondaryColor')};
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
    -webkit-box-shadow: ${({ hasError }) =>
      `0 0 0 30px ${hasError ? '#fff9f8' : '#fbfbfb'} inset !important`};
  }
`

export default StyledTextArea
