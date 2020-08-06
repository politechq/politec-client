import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'hooks/use-document-title'
import { slugify } from 'transliteration'

import styled from 'styled-components'

import { append, filter, isNil, not, or, unless } from 'ramda'
import { isEmptyArray } from 'ramda-adjunct'
import { notEqual } from 'ramda-extension'

import Block from 'components/Block'
import Button from 'components/Button'
import Drawer from 'components/Drawer'
import Input from 'components/Input'
import Table from 'components/Table'

import ADD_DATA_TABLE from 'modules/data/graphql/add-data-table'

import { theme } from 'helpers'

import AttributeForm from './AttributeForm'

const StyledForm = styled.form`
  background: ${theme('contrastColor')};
  max-width: 500px;
  padding: 16px;
`

const StyledTitle = styled.h3`
  font-size: 18px;
  font-weight: normal;
  margin: 0 0 24px;
`

const NewDataTable = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const [tableName, setTableName] = useState('')
  const [tableCode, setTableCode] = useState('')
  const [attributes, setAttributes] = useState([])
  const [isAttributeFormOpened, setIsAttributeFormOpened] = useState(false)
  const closeAttributeForm = () => setIsAttributeFormOpened(false)
  const addAttribute = attribute => setAttributes(append(attribute, attributes))
  const [addDataTable, { data }] = useMutation(ADD_DATA_TABLE)
  useDocumentTitle(t('new-data-table'))
  const onSubmit = event => {
    event.preventDefault()
    const variables = {
      attributes,
      code: tableCode,
      name: tableName,
    }
    addDataTable({ variables })
  }
  unless(isNil, () => history.push('/data-tables'))(data)
  return (
    <div>
      <StyledForm onSubmit={onSubmit}>
        <StyledTitle>{t('general-information')}</StyledTitle>
        <Block>
          <Input
            name={'tableName'}
            onChange={({ target: { value } }) => {
              setTableName(value)
              setTableCode(slugify(value))
            }}
            placeholder={t('table-name')}
            type={'text'}
            value={tableName}
          />
        </Block>
        <StyledTitle style={{ marginTop: 24 }}>{t('attributes')}</StyledTitle>
        <Block>
          <Table
            actions={[
              {
                func: ({ id: attributeId }) =>
                  setAttributes(
                    filter(({ id }) => notEqual(id, attributeId), attributes),
                  ),
                icon: 'trash',
                id: 'delete-attribute',
                name: t('delete-attribute'),
              },
            ]}
            columns={[
              {
                id: 'title',
                sortable: false,
                title: t('attribute-name'),
              },
              {
                id: 'type',
                render: value => t(value),
                sortable: false,
                title: t('attribute-type'),
              },
            ]}
            data={attributes}
            toolbar={[
              {
                func: () => setIsAttributeFormOpened(true),
                icon: 'plus',
                id: 'add-attribute',
                name: t('add-attribute'),
              },
            ]}
          />
        </Block>
        <Block noMargin>
          <Button
            disabled={or(isEmptyArray(attributes), not(tableName))}
            type={'submit'}
          >
            {t('create')}
          </Button>
        </Block>
      </StyledForm>
      <Drawer isOpen={isAttributeFormOpened}>
        <StyledTitle>{t('add-attribute')}</StyledTitle>
        <AttributeForm
          addAttribute={addAttribute}
          attributes={attributes}
          closeAttributeForm={closeAttributeForm}
        />
      </Drawer>
    </div>
  )
}

export default NewDataTable
