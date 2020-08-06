import React, { useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import {
  always,
  append,
  curry,
  equals,
  find,
  ifElse,
  map,
  pipe,
  prop,
  propEq,
  reject,
} from 'ramda'
import { isNonEmptyArray } from 'ramda-adjunct'
import { toggle } from 'ramda-extension'

import Icon from 'components/Icon'
import Options from 'components/Select/Options'

import { theme } from 'helpers'

const StyledSelect = styled.div`
  position: relative;
`

const StyledValues = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: ${theme('inputBackground')};
  border: ${ifElse(
    prop('hasError'),
    pipe(
      theme('errorColor'),
      color => `1px solid ${color}`,
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

const StyledLabel = styled.label`
  display: block;
  position: absolute;
  pointer-events: none;
  font-size: ${ifElse(prop('hasValue'), always('11px'), always('15px'))};
  right: 16px;
  left: 16px;
  top: ${ifElse(prop('hasValue'), always('8px'), always('16px'))};
  transition: 0.2s ease all;
  color: #6c6c6c;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
`

const StyledValue = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 6px;
  border: ${theme('border')};
  background: ${theme('buttonBackground')};
  border-radius: 4px;
  margin-right: 8px;
  margin-top: 6px;
`

const StyledSpan = styled.span`
  font-size: 11px;
  color: ${theme('textColor')};
  margin-right: 4px;
  user-select: none;
  cursor: normal;
`

const MultiSelect = ({ onChange, options, placeholder, value, ...props }) => {
  const [selectedValues, setSelectedValues] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const selectRef = useRef(null)
  const toggleTF = toggle(true, false)
  const toggleOptions = () => setIsExpanded(toggleTF(isExpanded))
  const removeValue = val => {
    setSelectedValues(
      reject(selectValue => equals(selectValue, val), selectedValues),
    )
  }
  const selectValue = val => {
    setSelectedValues(append(val, selectedValues))
    setIsExpanded(false)
    return val
  }
  const renderValues = curry((values, ops) =>
    map(
      val => (
        <StyledValue key={val}>
          <StyledSpan>{find(propEq('value', val), ops).name}</StyledSpan>
          <Icon
            fill={'#fff'}
            name={'times'}
            onClick={event => {
              event.stopPropagation()
              removeValue(val)
            }}
            size={10}
            style={{ cursor: 'pointer' }}
          />
        </StyledValue>
      ),
      values,
    ),
  )
  useEffect(() => {
    setSelectedValues(value)
  }, [value])
  return (
    <StyledSelect ref={selectRef} {...props}>
      <StyledValues onClick={toggleOptions}>
        <StyledLabel hasValue={isNonEmptyArray(selectedValues)}>
          {placeholder}
        </StyledLabel>
        {renderValues(selectedValues, options)}
      </StyledValues>
      <Options
        isExpanded={isExpanded}
        onChange={() => onChange(null, selectedValues)}
        options={options}
        selectRef={selectRef}
        selectValue={selectValue}
        toggleOptions={toggleOptions}
      />
    </StyledSelect>
  )
}

export default MultiSelect
