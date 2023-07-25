import BaseDAO from "./Base.dao";
import SQLiteDB from "../SQLite.database";

export type User = {
    id: number
    name?: string
    email?: string
}

const TABLE_NAME = 'USER'

export default class UserDAO extends BaseDAO<User> {
    constructor() { 
        super(TABLE_NAME)
        this.$init()
    }

    private $init() {
        const db = SQLiteDB.getInstance()
        db.execAsync(
            [{ sql: `create table if not exists ${TABLE_NAME} 
                (id integer primary key autoincrement not null, name text, email text);`,
            args: []}], false)
        .catch(err => console.error('Error al instanciar la tabla', err))
    }

    async insertOne(data: Omit<User, 'id'>) {
        try {
            const db = SQLiteDB.getInstance()
            const res = await db.execAsync([
                { sql: `insert into ${TABLE_NAME} (email, name) values (?, ?);`, args: [data.email, data.name] }
            ], false)
            return res[0].insertId
        } catch(err) {
            if(err instanceof Error) throw err
            throw new Error('Failed to create User')
        }
    }
}