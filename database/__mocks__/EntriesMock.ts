/* eslint-disable @typescript-eslint/naming-convention */
import { type EntryFull, type Entry } from '../DAOs/Entry.dao'
import { type Food } from '../DAOs/Food.dao'
import { type Ubication } from '../DAOs/Ubication.dao'
import { mockFoods } from './FoodsMock'
import { mockUbications } from './UbicationMock'

export const mockEntries: Entry[] = [
  {
    id: 1,
    user_id: 1,
    ubication_id: 1,
    food_id: 1,
    quantity: 1500,
    taken: false,
    date_stored: Date.now(),
    date_ready: Date.now() + 1000 * 60 * 60 * 24
  },
  {
    id: 2,
    user_id: 1,
    ubication_id: 1,
    food_id: 2,
    quantity: 1000,
    taken: false,
    date_stored: Date.now(),
    date_ready: Date.now() + 1000 * 60 * 60 * 24
  },
  {
    id: 3,
    user_id: 1,
    ubication_id: 2,
    food_id: 1,
    quantity: 2000,
    taken: false,
    date_stored: Date.now() - 1000 * 60 * 60 * 24,
    date_ready: Date.now() - 1000 * 60
  }
]

export const mockEntriesFull: EntryFull[] = mockEntries.map((entry) => {
  const { ubication_id, food_id, ...restOfEntry } = entry
  const { user_id: a, ...Ubication } = mockUbications.find(
    (e) => e.id === ubication_id
  ) as Ubication
  const { user_id: b, ...Food } = mockFoods.find(
    (e) => e.id === food_id
  ) as Food
  return {
    ...restOfEntry,
    Ubication,
    Food
  }
})
