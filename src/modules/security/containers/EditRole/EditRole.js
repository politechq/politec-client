import React, { forwardRef, useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { useForm, useField, splitFormProps } from 'react-form'
import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'hooks/use-document-title'

import styled from 'styled-components'
import { size } from 'polished'

import {
  always,
  F,
  identity,
  ifElse,
  isNil,
  pick,
  pipe,
  prop,
  unless,
  when,
} from 'ramda'
import { isNilOrEmpty } from 'ramda-adjunct'

import ROLE from 'modules/security/graphql/role'

import Block from 'components/Block'
import Button from 'components/Button'
import Input from 'components/Input'
import Spinner from 'components/Spinner'

import { theme } from 'helpers'

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme('contrastColor')};
  max-width: 500px;
  ${size('300px', '100%')};
`

const StyledFormContainer = styled.div`
  background: ${theme('contrastColor')};
  padding: 16px;
  max-width: 500px;
`

const InputField = forwardRef((props, ref) => {
  const [field, fieldOptions, rest] = splitFormProps(props)
  const {
    getInputProps,
    meta: { error, isTouched },
  } = useField(field, { ...fieldOptions, validatePristine: true })
  return (
    <Input
      error={when(identity, always(error))(isTouched)}
      {...getInputProps({ ref, ...rest })}
    />
  )
})

const EditRole = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const history = useHistory()
  const { data, loading } = useQuery(ROLE, {
    variables: { id: parseInt(id, 10) },
  })
  const getDefaultValues = unless(
    isNil,
    pipe(
      prop('role'),
      pick(['name']),
    ),
  )
  const {
    Form,
    meta: { canSubmit, isSubmitted },
  } = useForm({
    debugForm: false,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    defaultValues: useMemo(() => getDefaultValues(data), [loading]),
    onSubmit: values => {},
  })
  useDocumentTitle(t('edit-role'))
  when(identity, () => history.push('/roles'))(isSubmitted)
  return loading ? (
    <StyledContainer>
      <Spinner />
    </StyledContainer>
  ) : (
    <Form>
      <StyledFormContainer>
        <Block>
          <InputField
            field={'name'}
            placeholder={t('role-name')}
            validate={ifElse(
              isNilOrEmpty,
              always(t('empty-field', { field: t('role-name') })),
              F,
            )}
          />
        </Block>
        <Block noMargin>
          <Button
            onClick={history.goBack}
            outline
            style={{ marginRight: 8 }}
            type={'button'}
          >
            {t('back')}
          </Button>
          <Button disabled={!canSubmit} type={'submit'}>
            {t('edit-role')}
          </Button>
        </Block>
      </StyledFormContainer>
    </Form>
  )
}

export default EditRole
