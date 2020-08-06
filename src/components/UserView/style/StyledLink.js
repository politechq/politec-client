import { Link } from 'react-router-dom'

import styled from 'styled-components'

import { theme } from 'helpers'

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${theme('primaryColor')};
    transition: all 0.3s;
  }
`

export default StyledLink
