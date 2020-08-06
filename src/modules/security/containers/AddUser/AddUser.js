import React, { forwardRef } from 'react'
import { useForm, useField, splitFormProps } from 'react-form'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'hooks/use-document-title'

import styled from 'styled-components'

import { always, cond, complement, F, identity, ifElse, T, when } from 'ramda'
import { isNilOrEmpty } from 'ramda-adjunct'

import ADD_USER from 'modules/security/graphql/add-user'

import Block from 'components/Block'
import Button from 'components/Button'
import Input from 'components/Input'

import { isEmail, theme } from 'helpers'

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

const AddUser = () => {
  const { t } = useTranslation()
  const history = useHistory()
  useDocumentTitle(t('add-user'))
  const [addUser] = useMutation(ADD_USER)
  const {
    Form,
    meta: { canSubmit, isSubmitted },
  } = useForm({
    debugForm: false,
    onSubmit: values => {
      addUser({ variables: { ...values } })
    },
  })
  when(identity, () => history.push('/users'))(isSubmitted)
  return (
    <StyledFormContainer>
      <Form>
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
            {t('add-user')}
          </Button>
        </Block>
      </Form>
    </StyledFormContainer>
  )
}

export default AddUser
