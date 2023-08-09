import React from 'react'

import { Text } from '../../common/components/Themed'
import { type Entry as EntryType } from '../../../database/DAOs/Entry.dao'

interface EntryParams {
  entry: EntryType & { food_name: string | undefined }
}

export const Entry = ({ entry }: EntryParams) => {
  return (
    <Text key={entry.id}>
      {entry.food_name}-{entry.quantity}
    </Text>
  )
}
