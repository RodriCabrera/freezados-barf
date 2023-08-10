import { useState, useEffect } from 'react'

import UserDAO, { type User } from '../../../database/DAOs/User.dao'

export function useCurrentUser() {
  const [user, setUser] = useState<User>()

  const users = new UserDAO()

  useEffect(() => {
    users.getAll().then((result) => {
      if (result) setUser(result[0])
    })
  }, [])

  return { ...user }
}
