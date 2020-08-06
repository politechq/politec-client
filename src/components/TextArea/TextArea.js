import React, { useState } from 'react'

import { defaultTo, identity, when } from 'ramda'

import { StyledContent, StyledLabel, StyledTextArea, StyledTextAreaContainer } from './style'

const TextArea = ({
  content: Content,
  hasError,
  innerRef,
  name,
  placeholder,
  resize,
  ...props
}) => {
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
  return (
    <StyledTextAreaContainer>
      <StyledTextArea
        hasError={hasError}
        name={name}
        ref={innerRef || null}
        required
        resize={defaultTo('vertical', resize)}
        spellCheck={false}
        {...props}
      />
      {placeholder && (
        <StyledLabel htmlFor={name} isAutofilled={autofill}>
          {placeholder}
        </StyledLabel>
      )}
      {Content && (
        <StyledContent>
          <Content />
        </StyledContent>
      )}
    </StyledTextAreaContainer>
  )
}

TextArea.defaultProps = {
  hasError: false,
  innerRef: null,
  placeholder: null,
}

export default TextArea
