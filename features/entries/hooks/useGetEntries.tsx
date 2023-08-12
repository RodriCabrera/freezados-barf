import { useEffect, useState } from 'react'

import EntryDAO, { type EntryFull } from '../../../database/DAOs/Entry.dao'
import { useCurrentUser } from '../../common/hooks/useCurrentUser'

export const useGetEntries = () => {
  const [allEntries, setAllEntries] = useState<EntryFull[]>()
  const [error, setError] = useState<string | null>(null)

  const entries = new EntryDAO()
  const { id: userId } = useCurrentUser()

  useEffect(() => {
    if (userId) {
      entries
        .getAllEntriesByUser(userId)
        .then((res) => {
          setAllEntries(res)
          setError(null)
        })
        .catch((err) => {
          setError(err)
        })
    }
  }, [userId])

  console.log('allEntries', allEntries)

  return { entries: allEntries, error }
}
