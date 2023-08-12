import { StyleSheet } from 'react-native'

import { Text, View } from '../../features/common/components/Themed'
import { EntriesList } from '../../features/entries/components/EntriesList'
import { UbicationFilter } from '../../features/entries/components/UbicationFilter'
import { useGetEntries } from '../../features/entries/hooks/useGetEntries'
import { Icon } from '../../features/common/components/Icon'

export default function HomeTab() {
  const { entries, error } = useGetEntries()

  return (
    <View style={styles.container}>
      {entries && (
        <>
          <UbicationFilter />
          <EntriesList />
        </>
      )}
      {error && <Text>Error</Text>}
      {!error && !entries && (
        <View style={styles.noDataContainer}>
          <Text>No hay alimentos guardados</Text>
          <Icon name="basket-remove-outline" size={90} color="pink" />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    paddingBottom: 150,
    paddingHorizontal: 15
  },
  noDataContainer: {
    alignItems: 'center',
    gap: 15,
    justifyContent: 'center',
    marginTop: 50
  }
})
