import { type Ubication } from '../DAOs/Ubication.dao'

export const mockUbications: Ubication[] = [
  {
    id: 1,
    name: 'Freezer casa',
    isFreezer: true,
    ubication: 'Cabildo 1111',
    user_id: 1,
    description: ''
  },
  {
    id: 2,
    name: 'Freezer viejos',
    isFreezer: true,
    ubication: 'Lacroze 111',
    user_id: 1,
    description: 'Freezer espacioso tipo baul'
  },
  {
    id: 3,
    name: 'Frigobar',
    isFreezer: false,
    ubication: 'Lacroze 111',
    user_id: 1,
    description: 'Freezer espacioso tipo baul'
  },
  {
    id: 4,
    name: 'Freezer roto',
    isFreezer: true,
    ubication: 'Lacroze 111',
    user_id: 1,
    description: 'Freezer espacioso tipo baul'
  }
]
