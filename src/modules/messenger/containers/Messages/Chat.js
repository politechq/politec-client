import React, { useRef, useState } from 'react'
import { number } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import styled from 'styled-components'
import { darken } from 'polished'

import { join, multiply, pipe } from 'ramda'

import Avatar from 'components/Avatar'
import Icon from 'components/Icon'
import Spinner from 'components/Spinner'
import TextArea from 'components/TextArea'

import USER_NAME_BY_ID from 'modules/messenger/graphql/user-name-by-id'

import { theme } from 'helpers'

import EmojiPicker from './EmojiPicker'

const StyledSpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${pipe(
    theme('contrastColor'),
    darken(0.015),
  )};
  width: calc(100% - 250px);
`

const StyledDialog = styled.div`
  display: flex;
  flex-direction: column;
  background: ${pipe(
    theme('contrastColor'),
    darken(0.015),
  )};
  width: calc(100% - 250px);
`

const StyledDialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${theme('headerHeight')} - ${multiply(16, 2)}px - 80px);
  width: 100%;
`

const StyledDiaglogMessage = styled.div`
  display: flex;
  position: relative;
  border-top: ${theme('border')};
  padding: 16px;
`

const StyledChatHeader = styled.div`
  padding: 16px;
  border-bottom: ${theme('border')};
`

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${theme('primaryColor')};
    transition: color 0.3s;
  }
`

const StyledName = styled.p`
  margin: 0 0 0 16px;
`

const StyledIcon = styled(Icon)`
  fill: ${theme('textColor')} !important;
  cursor: pointer;
`

const Chat = ({ id }) => {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  const [message, setMessage] = useState('')
  const [isPickerOpened, setIsPickerOpened] = useState(false)
  const { data, loading } = useQuery(USER_NAME_BY_ID, {
    variables: {
      id,
    },
  })
  const spacer = join(' ')
  const addEmoji = emoji => {
    setMessage(join('', [message, emoji, ' ']))
    inputRef.current.focus()
  }
  return loading ? (
    <StyledSpinnerContainer>
      <Spinner />
    </StyledSpinnerContainer>
  ) : (
    <StyledDialog>
      <StyledDialogContainer>
        <StyledChatHeader>
          <StyledLink to={`/view-user/${id}`}>
            <Avatar size={'m'} src={data.user.avatar} />
            <StyledName>
              {spacer([data.user.firstName, data.user.lastName])}
            </StyledName>
          </StyledLink>
        </StyledChatHeader>
      </StyledDialogContainer>
      <StyledDiaglogMessage>
        <TextArea
          content={() => (
            <StyledIcon
              name={'grin'}
              onClick={() => setIsPickerOpened(true)}
              size={18}
            />
          )}
          innerRef={inputRef}
          name={'message'}
          onChange={({ target: { value } }) => setMessage(value)}
          placeholder={t('message')}
          resize={'none'}
          type={'text'}
          value={message}
        />
        <EmojiPicker
          addEmoji={addEmoji}
          closePicker={() => setIsPickerOpened(false)}
          isPickerOpened={isPickerOpened}
        />
      </StyledDiaglogMessage>
    </StyledDialog>
  )
}

Chat.propTypes = {
  id: number.isRequired,
}

export default Chat
