import { StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

import { Text, View } from '../../features/common/components/Themed'
import { LinkButton } from '../../features/common/components/pressables/LinkButton'

export default function ConsumeModal() {
  const { id } = useLocalSearchParams()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usar entry id:{id}</Text>
      <LinkButton href="../">Volver</LinkButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    width: '80%'
  }
})
