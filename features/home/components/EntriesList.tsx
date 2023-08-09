import { StyleSheet } from 'react-native'

import { Text, View } from '../../common/components/Themed'
import { useEntries } from '../hooks/useEntries'
import { Entry } from './Entry'

export const EntriesList = () => {
  const { allEntries } = useEntries()

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Text>Slider</Text>
      </View>
      {allEntries?.map((entry) => <Entry key={entry.id} entry={entry} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    gap: 15
  },
  sliderContainer: {
    backgroundColor: 'gray',
    display: 'flex',
    height: 40
  }
})
