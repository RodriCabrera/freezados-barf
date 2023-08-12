import { StyleSheet } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Button } from '@rneui/base'

import { Text, View } from '../../features/common/components/Themed'
import { useEntry } from '../../features/entries/hooks/useEntry'

export default function ConsumeModal() {
  const { id } = useLocalSearchParams()
  const { entry } = useEntry({ id: Number(id) })
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usar</Text>
      <Text style={styles.subtitle}>
        {entry?.Food.name} {entry?.quantity}gr
      </Text>
      <View style={styles.buttonGroup}>
        <Button
          onPress={() => {
            router.push('/')
          }}
          buttonStyle={{
            backgroundColor: '#ca866f',
            borderRadius: 5
          }}
          titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
        >
          Cancelar
        </Button>
        <Button
          buttonStyle={{
            backgroundColor: 'rgba(111, 202, 186, 1)',
            borderRadius: 5
          }}
          titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
        >
          Usar
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between'
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    width: '80%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    width: '80%'
  }
})
