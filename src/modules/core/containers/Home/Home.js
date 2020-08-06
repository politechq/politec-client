import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'hooks/use-document-title'

import styled from 'styled-components'
import { size } from 'polished'

import { __, compose, concat, join, pick, prop, values } from 'ramda'

import CURRENT_USER_NAME from 'modules/core/graphql/current-user-name'

import { theme } from 'helpers'

const StyledContainer = styled.div`
  background: ${theme('contrastColor')};
  ${size('100%')};
  padding: 16px;
  min-height: 400px;
`

const Home = () => {
  const { t } = useTranslation()
  useDocumentTitle(t('home'))
  const { data, loading } = useQuery(CURRENT_USER_NAME)
  const renderGreeting = compose(
    concat(__, '!'),
    concat(`${t('hi')}, `),
    join(' '),
    values,
    pick(['firstName', 'lastName']),
    prop('currentUser'),
  )
  return <StyledContainer>{!loading && renderGreeting(data)}</StyledContainer>
}

export default Home
