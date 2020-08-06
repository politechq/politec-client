import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'hooks/use-document-title'

import styled from 'styled-components'
import { darken } from 'polished'

import { nanoid } from 'nanoid'

import {
  __,
  always,
  curry,
  equals,
  isNil,
  ifElse,
  map,
  multiply,
  pipe,
  prop,
  reject,
  split,
  toLower,
  when,
} from 'ramda'
import { isNilOrEmpty, mapIndexed } from 'ramda-adjunct'
import { alwaysEmptyString } from 'ramda-extension'

import Avatar from 'components/Avatar'
import Input from 'components/Input'

import USERS_BY_NAME from 'modules/messenger/graphql/users-by-name'

import { theme } from 'helpers'

import Chat from './Chat'

const dialogListWidth = 250

const StyledMessages = styled.div`
  display: flex;
  background: ${theme('contrastColor')};
  max-width: 800px;
  height: calc(100vh - ${theme('headerHeight')} - ${multiply(16, 2)}px);
  width: 100%;
  border: ${theme('border')};
`

const StyledDialogList = styled.div`
  width: ${dialogListWidth}px;
  border-left: ${theme('border')};
`

const StyledDialogSearchBox = styled.div`
  padding: 16px;
  border-bottom: ${theme('border')};
`

const StyledDialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - ${theme('headerHeight')} - ${multiply(16, 2)}px - 80px);
  width: calc(100% - 250px);
`

const StyledSearchResult = styled.div`
  display: flex;
  padding: 16px;
  border-bottom: ${theme('border')};

  &:hover {
    background: ${pipe(
      theme('contrastColor'),
      darken(0.015),
    )};
    transition: background 0.15s;
    cursor: pointer;
  }
`

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledAvatar = styled(Avatar)`
  margin-right: 12px;
`

const StyledFirstName = styled.p`
  font-size: 12px;
  margin: 0 0 4px;
`

const StyledLastName = styled.p`
  font-size: 15px;
  margin: 0;
`

const StyledHighlight = styled.span`
  background: ${theme('primaryColor')};
  color: #fff;
`

const Messages = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [chat, setChat] = useState(null)
  const { data } = useQuery(USERS_BY_NAME, {
    variables: {
      limit: 5,
      search,
    },
  })
  useDocumentTitle(t('messages'))
  const getHighlightedText = curry((pattern, string) =>
    pipe(
      split(new RegExp(`(${pattern})`, 'gi'), __),
      mapIndexed((part, index) =>
        when(
          pipe(
            toLower,
            equals(pattern),
          ),
          always(<StyledHighlight key={index}>{part}</StyledHighlight>),
        )(part),
      ),
    )(string, pattern),
  )
  const getHighlightedPattern = getHighlightedText(search)
  const renderSearchBox = ifElse(
    pipe(
      prop('usersByName'),
      isNilOrEmpty,
    ),
    alwaysEmptyString,
    pipe(
      ({ currentUser, usersByName }) =>
        reject(({ id }) => equals(id, currentUser.id), usersByName),
      map(({ avatar, firstName, id, lastName }) => (
        <StyledSearchResult
          key={id}
          onClick={() => {
            setSearch('')
            setChat(id)
          }}
        >
          <StyledAvatar size={'m'} src={avatar} />
          <StyledInfo>
            <StyledFirstName>
              {getHighlightedPattern(firstName)}
            </StyledFirstName>
            <StyledLastName>{getHighlightedPattern(lastName)}</StyledLastName>
          </StyledInfo>
        </StyledSearchResult>
      )),
    ),
  )
  const renderChat = ifElse(
    isNil,
    always(<StyledDialogContainer>{'Select a chat'}</StyledDialogContainer>),
    id => <Chat id={id} />,
  )
  return (
    <StyledMessages>
      {renderChat(chat)}
      <StyledDialogList>
        <StyledDialogSearchBox>
          <Input
            name={`search--${nanoid(8)}`}
            onChange={({ target: { value } }) => setSearch(value)}
            placeholder={t('search-user')}
            type={'text'}
            value={search}
          />
        </StyledDialogSearchBox>
        {renderSearchBox(data)}
      </StyledDialogList>
    </StyledMessages>
  )
}

export default Messages
