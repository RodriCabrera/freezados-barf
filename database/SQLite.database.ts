import * as SQLite from 'expo-sqlite'

export default class SQLiteDB {
    private static instance: SQLite.SQLiteDatabase
    private constructor() {}

    static getInstance(): SQLite.SQLiteDatabase {
        if (!SQLiteDB.instance) {
            SQLiteDB.instance = SQLite.openDatabase('freezados.db')
        }
        return this.instance
    }

}