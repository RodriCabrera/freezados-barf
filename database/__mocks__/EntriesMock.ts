import { type Entry } from '../DAOs/Entry.dao'

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
