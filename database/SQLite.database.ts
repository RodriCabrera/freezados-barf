import * as SQLite from 'expo-sqlite'

const database: SQLite.SQLiteDatabase = SQLite.openDatabase('freezados.db')

export default database
