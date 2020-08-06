import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'hooks/use-document-title'

import styled from 'styled-components'
import { size } from 'polished'

import {
  __,
  always,
  curry,
  equals,
  ifElse,
  join,
  map,
  pipe,
  replace,
  unary,
} from 'ramda'
import { isEmptyArray } from 'ramda-adjunct'
import { dotPathOr } from 'ramda-extension'

import USER from 'modules/security/graphql/user'

import Avatar from 'components/Avatar'
import Block from 'components/Block'
import Button from 'components/Button'
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

const StyledUserView = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledUserInfo = styled.div`
  width: 350px;
`

const StyledView = styled.form`
  background: ${theme('contrastColor')};
  padding: 16px;
  max-width: 500px;
`

const StyledLabel = styled.label`
  display: block;
  font-size: 11px;
  color: #6c6c6c;
  text-align: left;
`

const StyledInfo = styled.p`
  font-size: 15px;
  text-align: left;
  margin: 4px 0 8px;
`

const ViewUser = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const history = useHistory()
  const parse = unary(Number.parseInt)
  const { data, loading } = useQuery(USER, {
    variables: { id: parse(id) },
  })
  const commer = join(', ')
  useDocumentTitle(t('view-user'))
  const editUser = curry((userId, currentUserId) =>
    pipe(
      ifElse(
        equals(currentUserId),
        always('/settings'),
        replace('{{id}}', __, '/edit-user/{{id}}'),
      ),
      history.push,
    )(userId),
  )
  return loading ? (
    <StyledContainer>
      <Spinner />
    </StyledContainer>
  ) : (
    <StyledView>
      <StyledUserView>
        <Avatar size={'xl'} src={dotPathOr(null, 'user.avatar', data)} />
        <StyledUserInfo>
          <Block>
            <StyledLabel>{t('email')}</StyledLabel>
            <StyledInfo>{dotPathOr('', 'user.email', data)}</StyledInfo>
          </Block>
          <Block>
            <StyledLabel>{t('first-name')}</StyledLabel>
            <StyledInfo>{dotPathOr('', 'user.firstName', data)}</StyledInfo>
          </Block>
          <Block>
            <StyledLabel>{t('last-name')}</StyledLabel>
            <StyledInfo>{dotPathOr('', 'user.lastName', data)}</StyledInfo>
          </Block>
          <Block>
            <StyledLabel>{t('roles')}</StyledLabel>
            <StyledInfo>
              {pipe(
                dotPathOr([], 'user.roles'),
                ifElse(
                  isEmptyArray,
                  always('—'),
                  pipe(
                    map(({ name }) => name),
                    commer,
                  ),
                ),
              )(data)}
            </StyledInfo>
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
            <Button
              onClick={() =>
                editUser(parse(id), dotPathOr(null, 'currentUser.id', data))
              }
            >
              {t('edit-user')}
            </Button>
          </Block>
        </StyledUserInfo>
      </StyledUserView>
    </StyledView>
  )
}

export default ViewUser
