import { useState, useEffect } from 'react'

import UserDAO, { type User } from '../../../database/DAOs/User.dao'

export function useCurrentUser() {
  const [user, setUser] = useState<User>()

  const users = new UserDAO()

  useEffect(() => {
    users.getAll().then((result) => {
      if (result) setUser(result[result.length - 1]) // For the moment there will be only one user
    })
  }, [])

  return { ...user }
}
