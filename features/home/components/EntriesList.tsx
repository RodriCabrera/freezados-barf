import { FlatList, StyleSheet } from 'react-native'

import { View } from '../../common/components/Themed'
import { useEntries } from '../hooks/useEntries'
import { Entry } from './Entry'

export const EntriesList = () => {
  const { allEntries } = useEntries()
  return (
    <View style={styles.container}>
      <FlatList
        data={allEntries}
        renderItem={({ item }) => <Entry key={item.id} entry={item} />}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 15
  }
})
