import { FlatList, StyleSheet } from 'react-native'

import { View } from '../../common/components/Themed'
import { Entry } from './Entry'
import { mockEntriesFull } from '../../../database/__mocks__/EntriesMock'

export const EntriesList = () => {
  // USING DB - WITHOUT MOCK DATA:
  // const entries = new EntryDAO()
  // const [allEntries, setAllEntries] = useState<EntryFull[]>()
  // const { id: userId } = useCurrentUser()
  // useEffect(() => {
  //   if (userId) {
  //     entries.getAllEntriesByUser(userId).then((res) => {
  //       setAllEntries(res)
  //     })
  //   }
  // }, [userId])

  const entriesByReady = mockEntriesFull.sort((a, b) => {
    if (a.date_ready && b.date_ready) {
      return a.date_ready - b.date_ready
    } else if (a.date_ready && !b.date_ready) {
      return -1
    } else if (!a.date_ready && b.date_ready) {
      return 1
    } else {
      return 0
    }
  })

  return (
    <View style={styles.container}>
      <FlatList
        data={entriesByReady}
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
