import { FlatList, SafeAreaView, StyleSheet } from 'react-native'

import { Item } from './Item'
import { mockUbications } from '../../../../database/__mocks__/UbicationMock'

export const UbicationFilter = () => {
  return (
    <SafeAreaView>
      <FlatList
        horizontal
        style={styles.container}
        data={[...mockUbications, { id: 'add', name: 'ADD' }]}
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
