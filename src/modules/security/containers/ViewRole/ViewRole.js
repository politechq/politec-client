import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'hooks/use-document-title'

import styled from 'styled-components'
import { size } from 'polished'

import { prop } from 'ramda'

import ROLE from 'modules/security/graphql/role'

import Block from 'components/Block'
import Button from 'components/Button'
import Spinner from 'components/Spinner'

import formatDate from 'utils/format-date'
import { theme } from 'helpers'

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme('contrastColor')};
  max-width: 500px;
  ${size('300px', '100%')};
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

const ViewRole = () => {
  const { i18n, t } = useTranslation()
  const { id } = useParams()
  const history = useHistory()
  const { data, loading } = useQuery(ROLE, {
    variables: { id: parseInt(id, 10) },
  })
  const formatDateWithLang = formatDate(prop('language', i18n))
  useDocumentTitle(t('view-role'))
  return loading ? (
    <StyledContainer>
      <Spinner />
    </StyledContainer>
  ) : (
    <StyledView>
      <Block>
        <StyledLabel>{t('role-name')}</StyledLabel>
        <StyledInfo>{data.role.name}</StyledInfo>
      </Block>
      <Block>
        <StyledLabel>{t('created-at')}</StyledLabel>
        <StyledInfo>{formatDateWithLang(data.role.createdAt)}</StyledInfo>
      </Block>
      {/*<Block>
        <StyledLabel>{t('created-by')}</StyledLabel>
        <StyledInfo>
          <UserView value={createdBy} />
        </StyledInfo>
      </Block>*/}
      <Block noMargin>
        <Button
          onClick={history.goBack}
          outline
          style={{ marginRight: 8 }}
          type={'button'}
        >
          {t('back')}
        </Button>
        <Button onClick={() => history.push(`/edit-role/${id}`)}>
          {t('edit-role')}
        </Button>
      </Block>
    </StyledView>
  )
}

export default ViewRole
