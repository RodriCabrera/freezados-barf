import { Text, View } from './Themed'
import { useState, useEffect } from 'react'
import UserDAO from '../database/DAOs/User.dao'
import FoodDAO from '../database/DAOs/Food.dao'
import UbicationDAO from '../database/DAOs/Ubication.dao'
import EntryDAO from '../database/DAOs/Entry.dao'

function prepare() {
  const users = new UserDAO()
  users.dropTable('USER')
  const ubications = new UbicationDAO()
  ubications.dropTable('UBICATION')
  const foods = new FoodDAO()
  foods.dropTable('FOOD')
  const entries = new EntryDAO()
  entries.dropTable('ENTRY')
}

// prepare() // -> Prueba que se creen correctamente las tablas si ya estabamos usando alguna

export function DAOTests() {
  const [userId, setUserId] = useState<number>()
  const [ubicationId, setUbicationId] = useState<number>()
  const [foodId, setFoodId] = useState<number>()
  const [entryId, setEntryId] = useState<number>()

  useEffect(() => {
    const users = new UserDAO()
    users.deleteAll('USER')
    users.insertOne({ name: 'Roberto Gomez Bolaños' }).then((res) => {
      if (res) {
        setUserId(res)
        users.getById(res).then((newUser) => {
          console.log('\nUsuario agregado', newUser)
        })
      }
    })
  }, [])

  useEffect(() => {
    if (!userId) return
    const ubications = new UbicationDAO()
    ubications.deleteAll('UBICATION')
    const foods = new FoodDAO()
    foods.deleteAll('FOOD')
    ubications
      .insertOne({
        user_id: userId,
        description: 'Freezer de casa',
        isFreezer: true,
        name: 'Freezer',
        ubication: 'Casa'
      })
      .then((res) => {
        if (res) {
          setUbicationId(res)
          ubications.getById(res).then((newUb) => {
            console.log('\nUbicacion agregada: ', newUb)
          })
        }
      })
    foods
      .insertOne({
        name: 'Pechuga de pollo',
        species: 'AVIAR',
        user_id: userId,
        description: 'Pechuga del coto'
      })
      .then((res) => {
        if (res) {
          setFoodId(res)
          foods.getById(res).then((newFood) => {
            console.log('\nAlimento agregado: ', newFood)
          })
        }
      })
  }, [userId])

  useEffect(() => {
    if (!userId || !foodId || !ubicationId) return
    const entries = new EntryDAO()
    entries.deleteAll('ENTRY')
    entries
      .insertOne({
        user_id: userId,
        ubication_id: ubicationId,
        food_id: foodId,
        date_stored: undefined,
        date_ready: undefined,
        quantity: 1500,
        taken: false
      })
      .then((res) => {
        if (res) {
          setEntryId(res)
          entries.getById(res).then((newEntry) => {
            console.log('\nNuevo elemento guardado: ', newEntry)
          })
        }
      })
  }, [userId, foodId, ubicationId])

  return (
    <View>
      <Text>User id: {userId}</Text>
      <Text>Ubication id: {ubicationId}</Text>
      <Text>Food id: {foodId}</Text>
      <Text>Entry id: {entryId}</Text>
    </View>
  )
}
