import { type Food } from '../DAOs/Food.dao'

export const mockFoods: Food[] = [
  {
    id: 1,
    name: 'Alitas de pollo',
    species: 'AVIAR',
    user_id: 1,
    description: 'Enteras con piel'
  },
  {
    id: 2,
    name: 'Carnaza',
    species: 'BOVINE',
    user_id: 1,
    description: ''
  },
  {
    id: 3,
    name: 'Cornalitos',
    species: 'FISH',
    user_id: 1,
    description: ''
  },
  {
    id: 4,
    name: 'Panceta',
    species: 'PIG',
    user_id: 1,
    description: ''
  }
]
