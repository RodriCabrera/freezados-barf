import { StyleSheet } from 'react-native'
import { Text, View } from '../../features/common/components/Themed'

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guardar un alimento</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: '80%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
