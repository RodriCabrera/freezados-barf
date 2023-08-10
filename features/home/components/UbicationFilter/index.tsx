import { FlatList, SafeAreaView, StyleSheet } from 'react-native'

import { useUbications } from '../../hooks/useUbications'
import { Item } from './Item'

export const UbicationFilter = () => {
  const { ubications } = useUbications()
  return (
    <SafeAreaView>
      <FlatList
        horizontal
        style={styles.container}
        data={[...ubications, { id: 'add', name: 'ADD' }]}
        renderItem={({ item }) => (
          <Item name={item.name} add={item.name === 'ADD'} />
        )}
        keyExtractor={(item) => `${item.id}`}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 15,
    marginTop: 10
  }
})
