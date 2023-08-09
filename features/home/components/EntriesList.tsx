import { Text, View } from '../../common/components/Themed'
import { useEntries } from '../hooks/useEntries'

export const EntriesList = () => {
  const { allEntries } = useEntries()

  return (
    <View>
      {allEntries?.map((entry) => (
        <Text key={entry.id}>
          {entry.food_name}-{entry.quantity}
        </Text>
      ))}
    </View>
  )
}
