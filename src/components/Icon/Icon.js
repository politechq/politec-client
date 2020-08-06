import React from 'react'

import { __, always, defaultTo, ifElse, isNil, prop, subtract } from 'ramda'

import { StyledBackground } from './style'
import iconList from './icon-list'

const Icon = ({ background, fill, name, size: iconSize, ...props }) => {
  const getIconByName = defaultTo('window-close', prop(__, iconList))
  const IconComponent = getIconByName(name)
  const defaultTo16 = defaultTo(16)
  const defaultToBlack = defaultTo('#000')
  const minus6 = subtract(__, 6)
  const renderIcon = ifElse(
    isNil,
    always(
      <IconComponent
        fill={defaultToBlack(fill)}
        height={defaultTo16(iconSize)}
        width={defaultTo16(iconSize)}
        {...props}
      />,
    ),
    always(
      <StyledBackground
        background={background}
        size={defaultTo16(iconSize)}
        {...props}
      >
        <IconComponent
          fill={'#fff'}
          height={minus6(defaultTo16(iconSize))}
          style={{
            left: '50%',
            marginRight: '-50%',
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          width={minus6(defaultTo16(iconSize))}
        />
      </StyledBackground>,
    ),
  )
  return renderIcon(background)
}

export default Icon
