import React, { useState } from 'react'

import Tooltip from 'react-tooltip'

import { identity, ifElse, when } from 'ramda'
import { isNonEmptyString } from 'ramda-adjunct'
import { alwaysEmptyString } from 'ramda-extension'

import {
  StyledIcon,
  StyledInput,
  StyledInputContainer,
  StyledLabel,
} from './style'

const Input = ({ error, innerRef, name, placeholder, ...props }) => {
  const [autofill, setAutofill] = useState(false)
  if (innerRef) {
    window.addEventListener('load', () => {
      const isAutofilled = innerRef?.current.matches(':-webkit-autofill')
      when(identity, () => {
        setAutofill(true)
        innerRef.current.addEventListener('change', () => setAutofill(false))
      })(isAutofilled)
    })
  }
  const renderErrorMessage = ifElse(
    isNonEmptyString,
    message => (
      <span data-tip={message}>
        <StyledIcon
          data-tip={message}
          fill={'#f6404f'}
          name={'exclamation-triangle'}
          size={18}
        />
        <Tooltip />
      </span>
    ),
    alwaysEmptyString,
  )
  return (
    <StyledInputContainer>
      <StyledInput
        {...props}
        hasError={isNonEmptyString(error)}
        name={name}
        ref={innerRef || null}
        required
        spellCheck={false}
      />
      {placeholder && (
        <StyledLabel htmlFor={name} isAutofilled={autofill}>
          {placeholder}
        </StyledLabel>
      )}
      {renderErrorMessage(error)}
    </StyledInputContainer>
  )
}

export default Input
