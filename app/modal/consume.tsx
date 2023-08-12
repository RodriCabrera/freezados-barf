import { useEffect, useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Button } from '@rneui/base'

import { Text, View } from '../../features/common/components/Themed'
import { useEntry } from '../../features/entries/hooks/useEntry'
import { Icon } from '../../features/common/components/Icon'
import { SPECIES_ICONS_MAP } from '../../features/entries/constants'
import EntryDAO from '../../database/DAOs/Entry.dao'

export default function ConsumeModal() {
  const [quantity, setQuantity] = useState<string>()

  const { id } = useLocalSearchParams()
  const { entry } = useEntry({ id: Number(id) })

  useEffect(() => {
    setQuantity(entry?.quantity.toString())
  }, [])

  const onChangeQuantity = (quantity: string) => {
    // the selected quantity can be max the entry?.quantity
    if (entry?.quantity && Number(quantity) > entry?.quantity) {
      setQuantity(entry?.quantity.toString())
    } else {
      setQuantity(quantity)
    }
  }

  const storedDate = new Date(entry?.date_stored ?? '').toLocaleString()

  const entries = new EntryDAO()
  const handleConfirm = () => {
    entries
      .consumeEntry(Number(id), Number(quantity))
      .then((res) => {
        if (res) {
          alert(`usados!`)
          router.push('/')
        }
      })
      .catch((err) => {
        alert(`Error`)
        return err
      })
  }
     
  return (
    <View style={styles.container}>
      {entry && (
        <Icon
          name={SPECIES_ICONS_MAP[entry.Food.species]}
          color="pink"
          size={90}
        />
      )}
      <View style={styles.entryLine}>
        <Text style={styles.title}>Usar:</Text>
        <Text style={styles.subtitle}>{entry?.Food.name}</Text>
        {/* // TODO: Align TextInput within entryLine */}
        <TextInput
          style={styles.input}
          onChangeText={onChangeQuantity}
          value={quantity}
          keyboardType="numeric"
        />
        <Text style={styles.subtitle}>gr</Text>
      </View>
      <Text>Guardados el {storedDate}</Text>
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
          onPress={handleConfirm}
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
    gap: 30,
    justifyContent: 'center'
  },
  entryLine: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between'
  },
  input: {
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  }
})
