import React from 'react'
import { StyleSheet } from 'react-native'

import { Text, View } from '../../common/components/Themed'
import { type EntryFull } from '../../../database/DAOs/Entry.dao'

interface EntryParams {
  entry: EntryFull
}

export const Entry = ({ entry }: EntryParams) => {
  const { Food, Ubication, id, quantity, date_ready, date_stored } = entry
  return (
    <View style={styles.container}>
      <Text key={id} style={styles.header}>
        {Food.name} ({Food.species}) {quantity}gr
      </Text>
      <Text>date_stored: {date_stored}</Text>
      <Text>UbicationID: {Ubication.id}</Text>
      <Text>UbicationName: {Ubication.name}</Text>
      <Text>UbicationType: {Ubication.isFreezer ? 'other' : 'freezer'}</Text>
      <Text>date_ready: {date_ready}</Text>
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
