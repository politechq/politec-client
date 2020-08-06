import React, { forwardRef, useContext, useMemo, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useForm, useField, splitFormProps } from 'react-form'
import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'hooks/use-document-title'
import moment from 'moment'

import styled from 'styled-components'
import { size } from 'polished'

import {
  always,
  cond,
  complement,
  F,
  identity,
  ifElse,
  isNil,
  not,
  pick,
  pipe,
  prop,
  T,
  unless,
  when,
} from 'ramda'
import { isNilOrEmpty } from 'ramda-adjunct'
import { notEqual } from 'ramda-extension'

import CURRENT_USER from 'modules/security/graphql/current-user'

import AvatarUploader from 'components/AvatarUploader'
import Block from 'components/Block'
import Button from 'components/Button'
import Input from 'components/Input'
import Select from 'components/Select'
import Spinner from 'components/Spinner'
import { useNotification } from 'components/NotificationProvider'

import AppContext from 'context/AppContext'
import { SET_DATE_FORMAT, SET_THEME } from 'context/constants'

import ls from 'utils/ls'

import { isEmail, theme as themeFn } from 'helpers'

const StyledLoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${themeFn('contrastColor')};
  ${size(400, '100%')};
  max-width: 620px;
`

const StyledFormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${themeFn('contrastColor')};
  padding: 16px;
  max-width: 620px;
`

const StyledFormBody = styled.div`
  width: 450px;
`

const StyledFormAvatar = styled.div`
  display: flex;
  justify-content: center;
  width: 120px;
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

const Settings = () => {
  const { i18n, t } = useTranslation()
  const { dispatch, state } = useContext(AppContext)
  const currentLanguage = i18n.language
  const [theme, setTheme] = useState(state.theme)
  const [language, setLanguage] = useState(currentLanguage)
  const [dateFormat, setDateFormat] = useState(state.dateFormat)
  const { addNotification } = useNotification()
  const { data, loading } = useQuery(CURRENT_USER)
  const formatZeroDate = format =>
    moment(0)
      .locale(currentLanguage)
      .format(format)
  const getDefaultValues = unless(
    isNil,
    pipe(
      prop('currentUser'),
      pick(['email', 'firstName', 'lastName']),
    ),
  )
  const {
    Form,
    meta: { canSubmit },
  } = useForm({
    debugForm: false,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    defaultValues: useMemo(() => getDefaultValues(data), [loading]),
    onSubmit: values => {
      const updateLanguage = when(notEqual(currentLanguage), newLang => {
        i18n.changeLanguage(newLang)
        ls.set('LANG', newLang)
      })
      updateLanguage(language)
      const updateTheme = when(notEqual(state.theme), newTheme => {
        dispatch({
          theme: newTheme,
          type: SET_THEME,
        })
      })
      updateTheme(theme)
      const updateDateFormat = when(
        notEqual(state.dateFormat),
        newDateFormat => {
          dispatch({
            dateFormat: newDateFormat,
            type: SET_DATE_FORMAT,
          })
        },
      )
      updateDateFormat(dateFormat)
      console.log('values', values)
      addNotification({
        icon: 'check',
        message: () => 'Success',
        timeout: 5000,
        title: 'Success',
      })
    },
  })
  useDocumentTitle(t('settings'))
  return loading ? (
    <StyledLoadingContainer>
      <Spinner />
    </StyledLoadingContainer>
  ) : (
    <Form>
      <StyledFormContainer>
        <StyledFormAvatar>
          <AvatarUploader src={data?.currentUser.avatar} />
        </StyledFormAvatar>
        <StyledFormBody>
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
            <Select
              name={'language'}
              onChange={(event, value) => setLanguage(value)}
              options={[
                { name: t('english'), value: 'en' },
                { name: t('russian'), value: 'ru' },
              ]}
              placeholder={t('language')}
              value={language}
            />
          </Block>
          <Block>
            <Select
              name={'theme'}
              onChange={(event, value) => setTheme(value)}
              options={[
                { name: t('light'), value: 'light' },
                { name: t('dark'), value: 'dark' },
              ]}
              placeholder={t('theme')}
              value={theme}
            />
          </Block>
          <Block>
            <Select
              name={'dateFormat'}
              onChange={(event, value) => setDateFormat(value)}
              options={[
                { name: formatZeroDate('L'), value: 'L' },
                { name: formatZeroDate('l'), value: 'l' },
                { name: formatZeroDate('LL'), value: 'LL' },
                { name: formatZeroDate('ll'), value: 'll' },
                { name: formatZeroDate('LLL'), value: 'LLL' },
                { name: formatZeroDate('lll'), value: 'lll' },
                { name: formatZeroDate('LLLL'), value: 'LLLL' },
                { name: formatZeroDate('llll'), value: 'llll' },
              ]}
              placeholder={t('date-format')}
              value={dateFormat}
            />
          </Block>
          <Block noMargin>
            <Button disabled={not(canSubmit)} type={'submit'}>
              {t('save')}
            </Button>
          </Block>
        </StyledFormBody>
      </StyledFormContainer>
    </Form>
  )
}

export default Settings
