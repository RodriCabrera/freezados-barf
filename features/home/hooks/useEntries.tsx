import { useEffect, useState } from 'react'

import EntryDAO, { type Entry } from '../../../database/DAOs/Entry.dao'
import FoodDAO, { type Food } from '../../../database/DAOs/Food.dao'

export const useEntries = () => {
  const entries = new EntryDAO()
  const food = new FoodDAO()
  const [allEntries, setAllEntries] =
    useState<Array<Entry & { food_name: string | undefined }>>()
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

  return { allEntries }
}
