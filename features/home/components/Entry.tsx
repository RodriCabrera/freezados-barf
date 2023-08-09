import React from 'react'
import { StyleSheet } from 'react-native'

import { Text, View } from '../../common/components/Themed'
import { type Entry as EntryType } from '../../../database/DAOs/Entry.dao'

interface EntryParams {
  entry: EntryType & { food_name: string | undefined }
}

export const Entry = ({ entry }: EntryParams) => {
  return (
    <View style={styles.container}>
      <Text key={entry.id} style={styles.header}>
        {entry.food_name} {entry.quantity}gr
      </Text>
      <Text>date_stored: {entry.date_stored}</Text>
      <Text>taken: {entry.taken ? 'TRUE' : 'FALSE'}</Text>
      <Text>UbicationID: {entry.ubication_id}</Text>
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
