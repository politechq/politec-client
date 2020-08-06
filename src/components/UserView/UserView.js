import React from 'react'
import { number } from 'prop-types'
import { useQuery } from '@apollo/react-hooks'

import { join } from 'ramda'

import Spinner from 'components/Spinner'

import USER_NAME from 'graphql/user-name'

import { StyledLink } from './style'

const UserView = ({ value: id }) => {
  const { data, loading } = useQuery(USER_NAME, {
    variables: { id },
  })
  const spacer = join(' ')
  return loading ? (
    <Spinner size={14} />
  ) : (
    <StyledLink
      onClick={event => event.stopPropagation()}
      to={`/view-user/${id}`}
    >
      {spacer([data.user.firstName, data.user.lastName])}
    </StyledLink>
  )
}

UserView.propTypes = {
  value: number.isRequired,
}

export default UserView
