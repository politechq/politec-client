import { Scrollbars } from 'react-custom-scrollbars'

import styled from 'styled-components'

import { theme } from 'helpers'

const StyledScrollbars = styled(Scrollbars)`
  height: calc(100vh - ${theme('headerHeight')});
`

export default StyledScrollbars
