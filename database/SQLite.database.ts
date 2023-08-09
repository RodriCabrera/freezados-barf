/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-extraneous-class */
import * as SQLite from 'expo-sqlite'

const database: SQLite.SQLiteDatabase = SQLite.openDatabase('freezados.db')

export default database
