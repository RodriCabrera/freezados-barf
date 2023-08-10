import { FlatList, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'

import { View } from '../../common/components/Themed'
import EntryDAO, { type EntryFull } from '../../../database/DAOs/Entry.dao'
import { Entry } from './Entry'
import { useCurrentUser } from '../../common/hooks/useCurrentUser'

export const EntriesList = () => {
  const entries = new EntryDAO()
  const [allEntries, setAllEntries] = useState<EntryFull[]>()
  const { id: userId } = useCurrentUser()

  useEffect(() => {
    if (userId) {
      entries.getAllEntriesByUser(userId).then((res) => {
        setAllEntries(res)
      })
    }
  }, [userId])

  return (
    <View style={styles.container}>
      <FlatList
        data={allEntries}
        renderItem={({ item }) => <Entry key={item.id} entry={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 15
  }
})
