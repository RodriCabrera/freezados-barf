import { type Food } from '../../database/DAOs/Food.dao'
import { type IconProps } from '../common/components/Icon'

export const SPECIES_ICONS_MAP: Record<Food['species'], IconProps['name']> = {
  AVIAR: 'food-drumstick',
  BOVINE: 'cow',
  FISH: 'fish',
  PIG: 'pig-variant'
}

export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short'
}
