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

export const Entry = ({ entry }: EntryParams) => {
  const { Food, Ubication, id, quantity, date_ready, date_stored } = entry
  return (
    <View style={styles.container}>
      <Icon name={ICON_MAP[entry.Food.species]} />
      <Text key={entry.id} style={styles.header}>
        {entry.Food.name} {entry.quantity}gr
      </Text>
      <Text>
        <Icon name="calendar" />
        {entry.date_stored && new Date(entry.date_stored).toLocaleDateString()}
      </Text>
      <Text>In {entry.Ubication.name}</Text>
      <Text>
        UbicationType: {entry.Ubication.isFreezer ? 'other' : 'freezer'}
      </Text>
      <Text>
        date_ready:{' '}
        {entry.date_ready && new Date(entry.date_ready).toLocaleDateString()}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink'
  },
  header: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%'
  }
})
