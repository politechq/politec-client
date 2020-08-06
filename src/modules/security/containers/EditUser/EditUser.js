import React, { forwardRef, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { useForm, useField, splitFormProps } from 'react-form'
import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'hooks/use-document-title'

import styled from 'styled-components'
import { size } from 'polished'

import {
  always,
  complement,
  cond,
  F,
  identity,
  ifElse,
  isNil,
  map,
  pick,
  pipe,
  prop,
  T,
  unless,
  when,
} from 'ramda'
import { isNilOrEmpty } from 'ramda-adjunct'
import { dotPath } from 'ramda-extension'

import USER from 'modules/security/graphql/user'

import Block from 'components/Block'
import Button from 'components/Button'
import Input from 'components/Input'
import MultiSelect from 'components/MultiSelect'
import Spinner from 'components/Spinner'

import { isEmail, theme } from 'helpers'

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

const EditUser = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const history = useHistory()
  const { data, loading } = useQuery(USER, {
    variables: { id: parseInt(id, 10) },
  })
  const getDefaultValues = unless(
    isNil,
    pipe(
      prop('user'),
      pick(['email', 'firstName', 'lastName']),
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
  const [roles, setRoles] = useState([])
  useDocumentTitle(t('edit-user'))
  const getRolesOptions = pipe(
    dotPath('user.roles'),
    map(({ id: roleId, name }) => ({ name, value: roleId })),
  )
  when(identity, () => history.push('/users'))(isSubmitted)
  return loading ? (
    <StyledContainer>
      <Spinner />
    </StyledContainer>
  ) : (
    <Form>
      <StyledFormContainer>
        <Block>
          <InputField
            field={'email'}
            placeholder={t('email')}
            validate={cond([
              [isNilOrEmpty, always(t('empty-field', { field: t('email') }))],
              [complement(isEmail), always('Invalid email')],
              [T, F],
            ])}
          />
        </Block>
        <Block>
          <InputField
            field={'firstName'}
            placeholder={t('first-name')}
            validate={ifElse(
              isNilOrEmpty,
              always(t('empty-field', { field: t('first-name') })),
              F,
            )}
          />
        </Block>
        <Block>
          <InputField
            field={'lastName'}
            placeholder={t('last-name')}
            validate={ifElse(
              isNilOrEmpty,
              always(t('empty-field', { field: t('last-name') })),
              F,
            )}
          />
        </Block>
        <Block>
          <MultiSelect
            name={'roles'}
            onChange={(event, value) => setRoles(value)}
            options={getRolesOptions(data)}
            placeholder={t('roles')}
            type={'text'}
            value={roles}
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
            {t('edit-user')}
          </Button>
        </Block>
      </StyledFormContainer>
    </Form>
  )
}

export default EditUser
