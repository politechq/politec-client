import React, { useRef, useState } from 'react'
import { arrayOf, shape, string } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { CSSTransition } from 'react-transition-group'

import { always, gt, identity, ifElse, map } from 'ramda'

import Icon from 'components/Icon'

import {
  StyledItem,
  StyledLink,
  StyledList,
  StyledMenu,
  StyledMenuName,
  StyledScrollbars,
  StyledSpan,
  StyledMenuContainer,
} from './style'

const Menu = ({ menu }) => {
  const { t } = useTranslation()
  const nodeRef = useRef(null)
  const [isCollapsed, setIsCollapsed] = useState(gt(768, window.innerWidth))
  const toggleMenu = () => setIsCollapsed(!isCollapsed)
  const renderMenu = map(({ icon, iconBackground, id, link, name }) => (
    <StyledItem key={id}>
      <StyledLink to={link}>
        <Icon
          background={iconBackground}
          name={icon}
          size={18}
          style={{ cursor: 'pointer' }}
        />
        <StyledMenuName>{t(name)}</StyledMenuName>
      </StyledLink>
    </StyledItem>
  ))
  const getCollapseMenuIcon = ifElse(
    identity,
    always('angle-double-right'),
    always('angle-double-left'),
  )
  const getCollapseMenuText = ifElse(
    identity,
    always(t('expand')),
    always(t('collapse')),
  )
  return (
    <CSSTransition in={isCollapsed} nodeRef={nodeRef} timeout={0}>
      {state => (
        <StyledMenu state={state}>
          <StyledScrollbars>
            <StyledMenuContainer>
              <StyledList>{renderMenu(menu)}</StyledList>
              <StyledList>
                <StyledItem>
                  <StyledSpan onClick={toggleMenu}>
                    <Icon
                      background={'#636366'}
                      name={getCollapseMenuIcon(isCollapsed)}
                      size={18}
                      style={{ cursor: 'pointer' }}
                    />
                    <StyledMenuName noBorder>
                      {getCollapseMenuText(isCollapsed)}
                    </StyledMenuName>
                  </StyledSpan>
                </StyledItem>
              </StyledList>
            </StyledMenuContainer>
          </StyledScrollbars>
        </StyledMenu>
      )}
    </CSSTransition>
  )
}

Menu.propTypes = {
  menu: arrayOf(
    shape({
      icon: string.isRequired,
      iconBackground: string.isRequired,
      id: string.isRequired,
      link: string.isRequired,
      name: string.isRequired,
    }).isRequired,
  ).isRequired,
}

export default Menu
