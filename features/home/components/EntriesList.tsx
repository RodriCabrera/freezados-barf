import { FlatList, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'

import { View } from '../../common/components/Themed'
import EntryDAO, { type EntryFull } from '../../../database/DAOs/Entry.dao'
import FoodDAO, { type Food } from '../../../database/DAOs/Food.dao'
import { Entry } from './Entry'
import { useCurrentUser } from '../../common/hooks/useCurrentUser'

export const EntriesList = () => {
  const entries = new EntryDAO()
  const food = new FoodDAO()
  const [allEntries, setAllEntries] = useState<EntryFull[]>()
  const [allFoods, setAllFoods] = useState<Food[]>()
  const { id: userId } = useCurrentUser()

  useEffect(() => {
    food.getAll().then((res) => {
      setAllFoods(res)
    })
  }, [])

  useEffect(() => {
    if (userId) {
      entries.getAllEntriesByUser(userId).then((res) => {
        setAllEntries(res)
      })
    }
  }, [allFoods, userId])

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
