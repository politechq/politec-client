import styled from 'styled-components'

import { always, compose, equals, ifElse, prop } from 'ramda'

import Icon from 'components/Icon'

const isEntered = compose(
  equals('entered'),
  prop('state'),
)

const StyledIcon = styled(Icon)`
  position: absolute;
  right: 16px;
  top: 16px;
  fill: currentColor;
  transform: ${ifElse(isEntered, always('rotate(180deg)'), always('none'))};
  transition: transform 0.25s;
`

export default StyledIcon
