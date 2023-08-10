import { FlatList, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'

import { View } from '../../common/components/Themed'
import EntryDAO, {
  type Entry as EntryType
} from '../../../database/DAOs/Entry.dao'
import FoodDAO, { type Food } from '../../../database/DAOs/Food.dao'
import { Entry } from './Entry'

export const EntriesList = () => {
  const entries = new EntryDAO()
  const food = new FoodDAO()
  const [allEntries, setAllEntries] =
    useState<Array<EntryType & { food_name: string | undefined }>>()
  const [allFoods, setAllFoods] = useState<Food[]>()

  useEffect(() => {
    food.getAll().then((res) => {
      setAllFoods(res)
    })
  }, [])

  useEffect(() => {
    entries.getAll().then((res) => {
      const entriesWithFoodName = res?.map((entry) => {
        const food = allFoods?.find((food) => food.id === entry.food_id)
        return {
          ...entry,
          food_name: food?.name
        }
      })
      const notTakenEntries = entriesWithFoodName?.filter(
        (entry) => !entry.taken
      )
      setAllEntries(notTakenEntries)
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
