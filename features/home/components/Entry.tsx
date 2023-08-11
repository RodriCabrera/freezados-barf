import { StyleSheet } from 'react-native'

import { Icon, type IconProps } from '../../common/components/Icon'
import { Text, View } from '../../common/components/Themed'
import { type EntryFull } from '../../../database/DAOs/Entry.dao'
import { type Food } from '../../../database/DAOs/Food.dao'

interface EntryParams {
  entry: EntryFull
}

const ICON_MAP: Record<Food['species'], IconProps['name']> = {
  AVIAR: 'food-drumstick',
  BOVINE: 'cow',
  FISH: 'fish',
  PIG: 'pig-variant'
}

const dateOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short'
}

export const Entry = ({ entry }: EntryParams) => {
  const { Food, Ubication, id, quantity, date_ready, date_stored } = entry
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon name={ICON_MAP[Food.species]} />
      </View>
      <Text key={id} style={styles.header}>
        {Food.name} {quantity}gr
      </Text>
      <View>
        <Text>
          {date_stored &&
            new Date(date_stored).toLocaleDateString(undefined, dateOptions)}
        </Text>
        <Text>In {Ubication.name}</Text>
        <Text>UbicationType: {Ubication.isFreezer ? 'other' : 'freezer'}</Text>
        <Text>
          date_ready:{' '}
          {date_ready &&
            new Date(date_ready).toLocaleDateString(undefined, dateOptions)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    flexDirection: 'row',
    gap: 1,
    padding: 5
  },
  header: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold'
  },
  icon: {
    backgroundColor: 'transparent',
    padding: 5
  }
})
