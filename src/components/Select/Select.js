import React, { useRef, useState } from 'react'
import { arrayOf, func, oneOfType, number, shape, string } from 'prop-types'
import { CSSTransition } from 'react-transition-group'

import {
  empty,
  equals,
  find,
  flip,
  ifElse,
  isNil,
  prop,
  pipe,
} from 'ramda'
import { isTrue } from 'ramda-adjunct'
import { alwaysEmptyString, defaultToTrue, toggle } from 'ramda-extension'

import { StyledIcon, StyledInput, StyledSelect } from './style'
import Options from './Options'

const Select = ({
  onChange,
  options,
  placeholder,
  showIcon,
  value,
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState(value)
  const [isExpanded, setIsExpanded] = useState(false)
  const nodeRef = useRef(null)
  const selectRef = useRef(null)
  const toggleTF = toggle(true, false)
  const toggleOptions = () => setIsExpanded(toggleTF(isExpanded))
  const getValueName = pipe(
    ifElse(
      flip(isNil),
      empty,
      pipe(
        (ops, val) =>
          find(({ value: optionValue }) => equals(optionValue, val), ops),
        prop('name'),
      ),
    ),
  )
  const selectValue = val => {
    setSelectedValue(val)
    setIsExpanded(false)
    return val
  }
  const renderIcon = ifElse(
    isTrue,
    () => (
      <CSSTransition in={isExpanded} nodeRef={nodeRef} timeout={0}>
        {state => <StyledIcon name={'caret-down'} state={state} />}
      </CSSTransition>
    ),
    alwaysEmptyString,
  )
  return (
    <StyledSelect ref={selectRef} {...props}>
      <StyledInput
        onChange={event => onChange(event, selectedValue)}
        onClick={toggleOptions}
        placeholder={placeholder}
        value={getValueName(options, selectedValue)}
      />
      <Options
        isExpanded={isExpanded}
        onChange={onChange}
        options={options}
        selectRef={selectRef}
        selectValue={selectValue}
        toggleOptions={toggleOptions}
      />
      {renderIcon(defaultToTrue(showIcon))}
    </StyledSelect>
  )
}

Select.propTypes = {
  onChange: func,
  options: arrayOf(
    shape({
      name: string.isRequired,
      value: oneOfType([string, number]),
    }),
  ).isRequired,
  placeholder: string,
  value: oneOfType([string, number]),
}

export default Select
