import { StyleSheet } from 'react-native'

import { View } from '../../features/common/components/Themed'
import { EntriesList } from '../../features/entries/components/EntriesList'
import { UbicationFilter } from '../../features/entries/components/UbicationFilter'

export default function HomeTab() {
  return (
    <View style={styles.container}>
      <UbicationFilter />
      <EntriesList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    paddingBottom: 150,
    paddingHorizontal: 15
  }
})
