import { StyleSheet } from 'react-native'
import { Button } from '@rneui/base'
import { router } from 'expo-router'

import { Icon } from '../../common/components/Icon'
import { Text, View } from '../../common/components/Themed'
import { type EntryFull } from '../../../database/DAOs/Entry.dao'
import { DATE_OPTIONS, SPECIES_ICONS_MAP } from '../constants'

interface EntryParams {
  entry: EntryFull
}

export const Entry = ({ entry }: EntryParams) => {
  const {
    Food,
    Ubication,
    id,
    quantity,
    date_ready,
    date_stored,
    date_consumed
  } = entry

  const isReady = date_ready ? date_ready <= new Date().getTime() : false

  return (
    <View style={styles.container}>
      <View style={styles.body} key={id}>
        <View style={styles.mainContent}>
          <View style={styles.icon}>
            <Icon
              name={SPECIES_ICONS_MAP[Food.species]}
              color={isReady ? 'green' : 'tomato'}
            />
          </View>
          <Text key={id} style={styles.header}>
            {Food.name} {quantity}gr
          </Text>
        </View>
        <View>
          <Text>
            date_stored:
            {date_stored &&
              new Date(date_stored).toLocaleDateString(undefined, DATE_OPTIONS)}
          </Text>
          <Text>In {Ubication.name}</Text>
          <Text>
            UbicationType: {Ubication.isFreezer ? 'other' : 'freezer'}
          </Text>
          <Text>
            date_ready:{' '}
            {date_ready &&
              new Date(date_ready).toLocaleDateString(undefined, DATE_OPTIONS)}
          </Text>
          <Text>
            date_consumed:{' '}
            {date_consumed &&
              new Date(date_consumed).toLocaleDateString(
                undefined,
                DATE_OPTIONS
              )}
          </Text>
        </View>
      </View>
      {isReady && (
        <Button
          buttonStyle={{ borderColor: 'black' }}
          type="outline"
          onPress={() => {
            router.push({ pathname: 'modal/consume', params: { id } })
          }}
        >
          <Text>Usar</Text>
        </Button>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 1,
    justifyContent: 'space-between',
    padding: 5
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  icon: {
    backgroundColor: 'transparent',
    padding: 5
  },
  mainContent: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: '100%'
  }
})
