import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

import UserDAO from '../../database/DAOs/User.dao';
import UbicationDAO from '../../database/DAOs/Ubication.dao';
import FoodDAO from '../../database/DAOs/Food.dao';

export default function TabOneScreen() {
  const users = new UserDAO()
  const ubications = new UbicationDAO()
  const foods = new FoodDAO()
  users.deleteAll('USER')

  // TODO: Better handle async code to avoid callback hell
  users.insertOne({ email: 's.rubio91@gmail.com', name: 'Santiago Rubio' })
  .then(res => {
    if(res) {
      users.getById(res).then(user => console.log(user))
    }
  }).then(() => 
    users.getAll().then(res => console.log(res))
  ).catch(err => console.error(err))
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
