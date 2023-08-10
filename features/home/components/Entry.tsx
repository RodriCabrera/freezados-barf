import React from 'react'
import { StyleSheet } from 'react-native'

import { Text, View } from '../../common/components/Themed'
import { type EntryFull } from '../../../database/DAOs/Entry.dao'

interface EntryParams {
  entry: EntryFull
}

export const Entry = ({ entry }: EntryParams) => {
  return (
    <View style={styles.container}>
      <Text key={entry.id} style={styles.header}>
        {entry.Food.name} ({entry.Food.species}) {entry.quantity}gr
      </Text>
      <Text>date_stored: {entry.date_stored}</Text>
      <Text>UbicationID: {entry.Ubication.id}</Text>
      <Text>UbicationName: {entry.Ubication.name}</Text>
      <Text>
        UbicationType: {entry.Ubication.isFreezer ? 'other' : 'freezer'}
      </Text>
      <Text>date_ready: {entry.date_ready}</Text>
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
