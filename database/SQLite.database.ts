import * as SQLite from 'expo-sqlite'

const database = SQLite.openDatabase('freezados.db')

export default database
