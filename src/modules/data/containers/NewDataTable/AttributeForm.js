import React, { useState } from 'react'
import {
  arrayOf,
  bool,
  elementType,
  func,
  number,
  oneOfType,
  shape,
  string,
} from 'prop-types'
import { useTranslation } from 'react-i18next'
import { slugify } from 'transliteration'

import {
  always,
  cond,
  curry,
  empty,
  equals,
  find,
  findIndex,
  ifElse,
  isEmpty,
  isNil,
  lte,
  map,
  not,
  pipe,
  prop,
  or,
  reduce,
} from 'ramda'
import { alwaysEmptyObject, alwaysEmptyString } from 'ramda-extension'

import Block from 'components/Block'
import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Input from 'components/Input'
import Select from 'components/Select'

import attributes from 'modules/data/attributes'

const CheckboxComponent = ({ defaultValue, id, name, setAttributeOptions }) => {
  const { t } = useTranslation()
  const [value, setValue] = useState(defaultValue)
  const onChange = val => {
    setAttributeOptions({ [id]: val })
    setValue(val)
  }
  return <Checkbox onChange={onChange} placeholder={t(name)} value={value} />
}

CheckboxComponent.propTypes = {
  defaultValue: bool.isRequired,
  id: string.isRequired,
  name: string.isRequired,
  setAttributeOptions: func.isRequired,
}

const SelectComponent = ({
  defaultValue,
  id,
  name,
  opts,
  setAttributeOptions,
}) => {
  const { t } = useTranslation()
  const [value, setValue] = useState(defaultValue)
  const onChange = (event, val) => {
    setAttributeOptions({ [id]: val })
    setValue(val)
  }
  return (
    <Select
      onChange={onChange}
      options={opts}
      placeholder={t(name)}
      value={value}
    />
  )
}

SelectComponent.propTypes = {
  defaultValue: string.isRequired,
  id: string.isRequired,
  name: string.isRequired,
  opts: arrayOf(
    shape({
      name: string.isRequired,
      value: string.isRequired,
    }),
  ).isRequired,
  setAttributeOptions: func.isRequired,
}

const AttributeForm = ({
  addAttribute,
  attributes: attributeList,
  closeAttributeForm,
}) => {
  const { t } = useTranslation()
  const [attributeTitle, setAttributeTitle] = useState('')
  const [attributeId, setAttributeId] = useState('')
  const [attributeType, setAttributeType] = useState(null)
  const [attributeOptions, setAttributeOptions] = useState(null)
  const [attributeRequired, setAttributeRequired] = useState(false)
  const getAttributeOptions = map(({ id }) => ({ name: t(id), value: id }))
  const renderAttributeTypeOptions = pipe(
    (type, list) => find(({ id }) => equals(id, type), list),
    prop('options'),
    ifElse(
      isNil,
      empty,
      /*
       * map(
       *   cond([
       *     [
       *       propEq('type', 'bool'),
       *       compose(
       *         CheckboxComponent,
       *         merge({ setAttributeOptions }),
       *       ),
       *     ],
       *     [
       *       propEq('type', 'select'),
       *       compose(
       *         SelectComponent,
       *         merge({ setAttributeOptions }),
       *       ),
       *     ],
       *   ]),
       * ),
       */
      map(({ id, type, ...props }) =>
        cond([
          [
            equals('bool'),
            always(
              <CheckboxComponent
                id={id}
                key={id}
                setAttributeOptions={setAttributeOptions}
                {...props}
              />,
            ),
          ],
          [
            equals('select'),
            always(
              <SelectComponent
                id={id}
                key={id}
                setAttributeOptions={setAttributeOptions}
                {...props}
              />,
            ),
          ],
        ])(type),
      ),
    ),
  )
  const getDefaultAttributeOptions = pipe(
    curry((type, attrs) => find(({ id }) => equals(id, type), attrs)),
    prop('options'),
    ifElse(
      isNil,
      alwaysEmptyObject,
      reduce(
        (result, { defaultValue, id }) => ({ ...result, [id]: defaultValue }),
        {},
      ),
    ),
  )
  const renderAttributeDefaultValue = pipe(
    ifElse(
      isNil,
      empty,
      pipe(
        curry((type, attrs) => find(({ id }) => equals(id, type), attrs)),
        prop('edit'),
        EditComponent => (
          <EditComponent
            attributeOptions={attributeOptions}
            placeholder={t('default-value')}
          />
        ),
      ),
    ),
  )
  const renderAttributeRequired = ifElse(
    type => isNil(type) || equals('logic', type),
    alwaysEmptyString,
    () => (
      <Checkbox
        onChange={() => setAttributeRequired(not(attributeRequired))}
        placeholder={t('required')}
        value={attributeRequired}
      />
    ),
  )
  const isArgsEmpty = curry((obj, str) => or(isNil(obj), isEmpty(str)))
  const isUniqCode = pipe(
    curry((attrCode, list) =>
      findIndex(({ code }) => equals(attrCode, code), list),
    ),
    lte(0),
  )
  const onSubmit = event => {
    event.preventDefault()
    addAttribute({
      id: attributeId,
      options: attributeOptions,
      required: attributeRequired,
      title: attributeTitle,
      type: attributeType,
    })
    closeAttributeForm()
  }

  return (
    <form noValidate onSubmit={onSubmit}>
      <Block>
        <Input
          name={'attribute-name'}
          onChange={({ target: { value } }) => {
            setAttributeTitle(value)
            setAttributeId(slugify(value))
          }}
          placeholder={t('attribute-name')}
          type={'text'}
          value={attributeTitle}
        />
      </Block>
      <Block>
        <Select
          name={'attribute-type'}
          onChange={(event, value) => {
            setAttributeOptions(getDefaultAttributeOptions(value, attributes))
            setAttributeType(value)
          }}
          options={getAttributeOptions(attributes)}
          placeholder={t('attribute-type')}
          value={attributeType}
        />
      </Block>
      <Block>{renderAttributeTypeOptions(attributeType, attributes)}</Block>
      <Block>{renderAttributeRequired(attributeType)}</Block>
      <Block>
        {renderAttributeDefaultValue(
          attributeType,
          attributes,
          attributeOptions,
        )}
      </Block>
      <Block>
        <Button
          onClick={closeAttributeForm}
          outline
          style={{ marginRight: 8 }}
          type={'button'}
        >
          {t('cancel')}
        </Button>
        <Button
          disabled={
            isArgsEmpty(attributeType, attributeId) ||
            isUniqCode(attributeId, attributeList)
          }
          type={'submit'}
        >
          {t('add-attribute')}
        </Button>
      </Block>
    </form>
  )
}

AttributeForm.propTypes = {
  addAttribute: func.isRequired,
  attributes: arrayOf(
    shape({
      edit: elementType.isRequired,
      id: string.isRequired,
      options: arrayOf(
        shape({
          defaultValue: oneOfType([bool, number, string]),
          id: string.isRequired,
          name: string.isRequired,
          type: string.isRequired,
        }),
      ),
    }),
  ).isRequired,
  closeAttributeForm: func.isRequired,
}

export default AttributeForm
