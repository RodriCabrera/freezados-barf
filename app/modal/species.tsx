import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'

import { Text, View } from '../../components/Themed'
import { LinkButton } from '../../components/pressables/LinkButton'

export default function SpeciesModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tiempos de congelado según especie</Text>
      {[
        'Bovino/Ovino/Aviar: 72hs',
        'Pescados: 7 días',
        'Porcinos: 14 días'
      ].map((specie) => (
        <View key={specie} style={styles.specie}>
          <Text key={specie} style={styles.specie}>
            {specie}
          </Text>
        </View>
      ))}
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
  specie: {
    fontSize: 20,
    marginBottom: 10,
    width: '80%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    width: '80%'
  }
})
