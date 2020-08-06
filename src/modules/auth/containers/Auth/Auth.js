import React, { forwardRef, useMemo, useState } from 'react'
import { func } from 'prop-types'
import { useForm, useField, splitFormProps } from 'react-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/react-hooks'

import browserFingerprint from 'browser-fingerprint'

import styled, { css, keyframes } from 'styled-components'

import {
  always,
  and,
  andThen,
  cond,
  complement,
  F,
  gt,
  head,
  identity,
  ifElse,
  isNil,
  length,
  not,
  pipe,
  prop,
  T,
  when,
} from 'ramda'
import { isNilOrEmpty } from 'ramda-adjunct'
import { dotPath } from 'ramda-extension'

import Block from 'components/Block'
import Button from 'components/Button'
import Input from 'components/Input'

import { isEmail, theme } from 'helpers'

import SIGN_IN from 'modules/auth/graphql/sign-in'

import ls from 'utils/ls'

import bg from './bg.jpg'

const bounce = keyframes`
  0% {
    transform: translateX(0);
    timing-function: ease-in;
  }
  37% {
    transform: translateX(5px);
    timing-function: ease-out;
  }
  55% {
    transform: translateX(-5px);
    timing-function: ease-in;
  }
  73% {
    transform: translateX(4px);
    timing-function: ease-out;
  }
  82% {
    transform: translateX(-4px);
    timing-function: ease-in;
  }
  91% {
    transform: translateX(2px);
    timing-function: ease-out;
  }
  96% {
    transform: translateX(-2px);
    timing-function: ease-in;
  }
  100% {
    transform: translateX(0);
    timing-function: ease-in;
  }
`

const animation = () => css`
  ${bounce} 0.5s infinite;
`

const StyledContainer = styled.div`
  background-image: url(${bg});
  position: fixed;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
`

const StyledFormContainer = styled.div`
  animation: ${ifElse(prop('showError'), always(animation), always('none'))};
  background: ${theme('backgroundColor')};
  border-radius: 6px;
  padding: 32px;
  width: 480px;
  position: absolute;
  left: calc(50% - 240px);
  margin-right: -50%;
  margin-top: 144px;
  margin-bottom: 64px;
  box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 0.5);

  @media (max-width: 520px) {
    width: calc(100vw - 40px);
    margin: 144px 20px 0;
    transform: none;
    left: 0;
  }
`

const StyledErrorMessage = styled.p`
  color: ${theme('errorColor')};
  font-size: 12px;
  margin: 0;
  height: 13px;
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

const Auth = ({ setToken }) => {
  const { t } = useTranslation()
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const fingerprint = browserFingerprint()
  const [signIn, { loading }] = useMutation(SIGN_IN)
  const makeError = message => {
    setErrorMessage(message)
    setShowError(true)
    setTimeout(() => {
      setShowError(false)
    }, 500)
  }
  const {
    Form,
    meta: { canSubmit },
  } = useForm({
    debugForm: false,
    defaultValues: useMemo(
      () => ({
        email: '',
        password: '',
      }),
      [],
    ),
    onSubmit: pipe(
      values =>
        signIn({
          variables: {
            fingerprint,
            ...values,
          },
        }),
      andThen(
        ifElse(
          pipe(
            prop('errors'),
            isNil,
          ),
          pipe(
            prop('data'),
            dotPath('signIn.token'),
            token => {
              ls.set('TOKEN', token)
              setToken(token)
            },
          ),
          pipe(
            prop('errors'),
            head,
            prop('message'),
            makeError,
          ),
        ),
      ),
    ),
  })
  return (
    <StyledContainer>
      <StyledFormContainer showError={showError}>
        <Form>
          <Block>
            <InputField
              field={'email'}
              placeholder={t('email')}
              validate={cond([
                [isNilOrEmpty, always(t('empty-field', { field: t('email') }))],
                [complement(isEmail), always(t('invalid-email'))],
                [T, F],
              ])}
            />
          </Block>
          <Block>
            <InputField
              field={'password'}
              placeholder={t('password')}
              type={'password'}
              validate={cond([
                [
                  isNilOrEmpty,
                  always(t('empty-field', { field: t('password') })),
                ],
                [
                  pipe(
                    length,
                    gt(6),
                  ),
                  always(
                    t('field-length-gt', { field: t('password'), length: 6 }),
                  ),
                ],
                [T, F],
              ])}
            />
          </Block>
          <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
          <Block noMargin>
            <Button
              disabled={and(not(canSubmit), not(loading))}
              type={'submit'}
            >
              {'Войти'}
            </Button>
          </Block>
        </Form>
      </StyledFormContainer>
    </StyledContainer>
  )
}

Auth.propTypes = {
  setToken: func.isRequired,
}

export default Auth
