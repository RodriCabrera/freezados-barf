import { FlatList, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'

import { View } from '../../common/components/Themed'
import EntryDAO, {
  type EntryFull,
  type Entry as EntryType
} from '../../../database/DAOs/Entry.dao'
import FoodDAO, { type Food } from '../../../database/DAOs/Food.dao'
import { Entry } from './Entry'

export const EntriesList = () => {
  const entries = new EntryDAO()
  const food = new FoodDAO()
  const [allEntries, setAllEntries] = useState<EntryFull[]>()
  const [allFoods, setAllFoods] = useState<Food[]>()

  useEffect(() => {
    food.getAll().then((res) => {
      setAllFoods(res)
    })
  }, [])

  useEffect(() => {
    entries.getAllEntriesByUser(1).then((res) => {
      setAllEntries(res)
    })
  }, [allFoods])

  return (
    <View style={styles.container}>
      <FlatList
        data={allEntries}
        renderItem={({ item }) => <Entry key={item.id} entry={item} />}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 15
  }
})
