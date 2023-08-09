import { StyleSheet } from 'react-native'

import { View } from '../../features/common/components/Themed'
import { EntriesList } from '../../features/home/components/EntriesList'
// import { DAOTests } from '../../features/common/components/DAOTests'
// import { mockEntries } from '../../database/__mocks__/EntriesMock'
// import { mockFoods } from '../../database/__mocks__/FoodsMock'
// import { mockUbications } from '../../database/__mocks__/UbicationMock'

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <EntriesList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  }
})
