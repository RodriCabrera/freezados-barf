import { StyleSheet, TextInput } from 'react-native'
import { useState } from 'react'
import { Button } from '@rneui/base'
import { router } from 'expo-router'

import { Text, View } from '../../features/common/components/Themed'
import EntryDAO from '../../database/DAOs/Entry.dao'
import { useCurrentUser } from '../../features/common/hooks/useCurrentUser'

export default function AddEntryTab() {
  const [foodId, setFoodId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [ubicationId, setUbicationId] = useState('')
  const { id: userId } = useCurrentUser()
  const entries = new EntryDAO()

  const handleConfirm = () => {
    entries
      .insertOne({
        user_id: Number(userId),
        ubication_id: 70,
        food_id: 70,
        date_stored: new Date().getTime(),
        date_ready: new Date().getTime() + 172800000, // Mejor no calcular acá.
        quantity: Number(quantity),
        taken: false
      })
      .then((res) => {
        console.log('SUCCESS', res)
        router.push('/')
      })
      .catch((err) => {
        console.log('ERR', err)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guardar un alimento</Text>
      <TextInput
        style={styles.input}
        placeholder="Alimento"
        value={foodId}
        onChangeText={(text) => {
          setFoodId(text)
        }}
      />
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={(text) => {
          setQuantity(text)
        }}
        placeholder="Cantidad"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={ubicationId}
        onChangeText={(text) => {
          setUbicationId(text)
        }}
        placeholder="Ubicación"
      />
      <Button
        onPress={handleConfirm}
        buttonStyle={{
          backgroundColor: '#6fca80',
          borderRadius: 5
        }}
        titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
      >
        Guardar
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 25
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    marginVertical: 10,
    padding: 10,
    width: '80%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
