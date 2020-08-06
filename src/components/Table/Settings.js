import React, { forwardRef, useEffect, useState } from 'react'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useForm, useField, splitFormProps } from 'react-form'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import {
  always,
  append,
  forEach,
  inc,
  insert,
  isEmpty,
  isNil,
  not,
  pipe,
  pluck,
  prepend,
  prop,
  reject,
  remove,
  slice,
  startsWith,
  unless,
  when,
} from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import { defaultToTrue, notEqual } from 'ramda-extension'

import Block from 'components/Block'
import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Drawer from 'components/Drawer'

import { StyledField, StyledSpan, StyledTitle } from './style'

const InputField = forwardRef((props, ref) => {
  const [field, fieldOptions, rest] = splitFormProps(props)
  const { checked: defaultValue } = props
  const { getInputProps, setValue, value } = useField(field, {
    ...fieldOptions,
    defaultValue,
  })
  const onChange = () => setValue(not(value))
  return (
    <Checkbox
      {...getInputProps({ ref, ...rest })}
      onChange={onChange}
      value={value}
    />
  )
})

InputField.propTypes = {
  checked: bool.isRequired,
}

const Settings = ({
  allColumns,
  setColumnOrder,
  setSettingsOpened,
  settingsOpened,
  showActions,
  showNumbers,
}) => {
  const { t } = useTranslation()
  const [items, setItems] = useState([])
  const [order, setOrder] = useState(null)
  const {
    Form,
    meta: { canSubmit },
  } = useForm({
    debugForm: false,
    onSubmit: values => {
      forEach(({ getToggleHiddenProps, id, isVisible }) => {
        const { onChange } = getToggleHiddenProps()
        const checked = prop(id, values)
        if (notEqual(isVisible, defaultToTrue(checked))) {
          onChange({ target: { checked } })
        }
      }, allColumns)
      setColumnOrder(
        pipe(
          when(always(showNumbers), prepend('__number__')),
          when(always(showActions), append('__actions__')),
        )(order),
      )
      setSettingsOpened(false)
    },
  })
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = slice(startIndex, inc(startIndex), result)
    return insert(endIndex, removed, remove(startIndex, 1, result))
  }
  const onDragEnd = pipe(
    unless(isNil, result => {
      const newItems = reorder(
        items,
        result.source.index,
        result.destination.index,
      )
      setOrder(pluck('id', newItems))
      setItems(newItems)
    }),
  )
  useEffect(() => {
    const filterColumns = reject(
      pipe(
        prop('id'),
        startsWith('__'),
      ),
    )
    if (!isEmpty(allColumns)) {
      setItems(filterColumns(allColumns))
    }
  }, [allColumns])
  return (
    <Drawer isOpen={settingsOpened}>
      <StyledTitle>{t('table-settings')}</StyledTitle>
      <Form>
        <Block>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'droppable'}>
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {mapIndexed(
                    (column, index) => (
                      <Draggable
                        draggableId={column.id}
                        index={index}
                        key={column.id}
                      >
                        {(providedColumn, snapshot) => (
                          <StyledField
                            ref={providedColumn.innerRef}
                            {...providedColumn.draggableProps}
                            {...providedColumn.dragHandleProps}
                          >
                            <InputField
                              field={column.id}
                              {...column.getToggleHiddenProps()}
                            />
                            <StyledSpan
                              isDragging={prop('isDragging', snapshot)}
                            >
                              {prop('Header', column)}
                            </StyledSpan>
                          </StyledField>
                        )}
                      </Draggable>
                    ),
                    items,
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Block>
        <Block>
          <Button
            onClick={() => setSettingsOpened(false)}
            outline
            style={{ marginRight: 8 }}
            type={'button'}
          >
            {t('cancel')}
          </Button>
          <Button disabled={not(canSubmit)}>{t('update')}</Button>
        </Block>
      </Form>
    </Drawer>
  )
}

Settings.propTypes = {
  allColumns: arrayOf(
    shape({
      Header: string.isRequired,
      id: string.isRequired,
      isVisible: bool.isRequired,
    }).isRequired,
  ),
  setColumnOrder: func.isRequired,
  setSettingsOpened: func.isRequired,
  settingsOpened: bool.isRequired,
  showActions: bool.isRequired,
  showNumbers: bool.isRequired,
}

export default Settings
