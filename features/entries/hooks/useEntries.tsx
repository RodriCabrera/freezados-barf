import { useEffect, useState } from 'react'

import EntryDAO, { type EntryFull } from '../../../database/DAOs/Entry.dao'
import { mockEntriesFull } from '../../../database/__mocks__/EntriesMock'
import { useCurrentUser } from '../../common/hooks/useCurrentUser'

export const useEntries = () => {
  // USING DB - WITHOUT MOCK DATA:
  const entries = new EntryDAO()
  const [allEntries, setAllEntries] = useState<EntryFull[]>([])
  const { id: userId } = useCurrentUser()
  useEffect(() => {
    if (userId) {
      entries.getAllEntriesByUser(userId).then((res) => {
        if (res) setAllEntries(res)
      })
    }
  }, [userId])

  const entriesByReadiness = mockEntriesFull.sort((a, b) => {
    if (a.date_ready && b.date_ready) {
      return a.date_ready - b.date_ready
    } else if (a.date_ready && !b.date_ready) {
      return -1
    } else if (!a.date_ready && b.date_ready) {
      return 1
    } else {
      return 0
    }
  })

  return { entries: allEntries }
}
