import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'

import { Text, View } from '../../features/common/components/Themed'
import { LinkButton } from '../../features/common/components/pressables/LinkButton'

export default function SpeciesModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar un freezer o heladera</Text>
      <LinkButton href="../">Volver</LinkButton>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
