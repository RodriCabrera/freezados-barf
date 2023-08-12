import { FlatList, StyleSheet } from 'react-native'

import { View } from '../../common/components/Themed'
import { Entry } from './Entry'
import { useEntries } from '../hooks/useEntries'

export const EntriesList = () => {
  const { entries } = useEntries()

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        renderItem={({ item }) => <Entry key={item.id} entry={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 15
  }
})
