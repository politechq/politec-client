import React, { Fragment, useState, type Element } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import { pipe, prop } from 'ramda'
import { toggle } from 'ramda-extension'

import Avatar from 'components/Avatar'

import AVATAR from 'graphql/avatar'

import {
  StyledContainer,
  StyledHeader,
  StyledLogo,
  StyledNameContainer,
  StyledOverlay,
  StyledUserMenu,
  StyledUserMenuItem,
  StyledUserMenuList,
} from './style'

const Header = (): Element => {
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false)
  const toggleTF = toggle(true, false)
  const toggleUserMenu = () => setIsUserMenuOpened(toggleTF(isUserMenuOpened))
  const { data, loading } = useQuery(AVATAR)
  const renderAvatar = pipe(
    prop('currentUser'),
    ({ avatar }) => <Avatar onClick={toggleUserMenu} size={'m'} src={avatar} />,
  )
  return (
    <StyledHeader>
      <StyledContainer>
        <StyledNameContainer>
          <StyledLogo />
          <span>{'Politec'}</span>
        </StyledNameContainer>
        {!loading && renderAvatar(data)}
      </StyledContainer>
      {isUserMenuOpened && (
        <Fragment>
          <StyledOverlay onClick={toggleUserMenu} />
          <StyledUserMenu>
            <StyledUserMenuList>
              <StyledUserMenuItem onClick={toggleUserMenu}>
                <Link to={'/sign-out'}>{'Sign out'}</Link>
              </StyledUserMenuItem>
            </StyledUserMenuList>
          </StyledUserMenu>
        </Fragment>
      )}
    </StyledHeader>
  )
}

export default Header
