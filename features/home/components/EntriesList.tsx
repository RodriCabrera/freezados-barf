import { FlatList, StyleSheet } from 'react-native'

import { View } from '../../common/components/Themed'
import { Entry } from './Entry'
import { mockEntriesFull } from '../../../database/__mocks__/EntriesMock'

export const EntriesList = () => {
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

  return (
    <View style={styles.container}>
      <FlatList
        data={mockEntriesFull}
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
