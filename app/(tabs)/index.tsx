import { StyleSheet, Platform } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

import SQLiteDB from '../../database/SQLite.database';


export default function TabOneScreen() {
  const db = SQLiteDB.getInstance()
  if (Platform.OS !== 'web') {
    // examples
    db.execAsync([
        { sql: "drop table if exists items", args: [] },
        { sql: "create table if not exists items (id int primary key not null, done boolean, value varchar(255));", args: [] },
        { sql: "insert into items (id, done, value) values (?, ?, ?)", args: [1, 0, 'hola desde la base de datos'] },
      ], false)
        .then(res => console.log(res))
        .catch(err => console.error(err))
  
    db.execAsync([
          {sql: "select * from items", args: [] }
        ], true)
        .then(res => res[0].rows.forEach(i => console.log(i.value)))
        .catch(err => console.error(err))
      //
  }
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
