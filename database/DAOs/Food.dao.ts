import BaseDAO from "./Base.dao"
import SQLiteDB from "../SQLite.database"

import { User } from "./User.dao"

export type Species = 'PIG' | 'FISH' | 'BOVINE' | 'AVIAR'

export type Food = {
    id: number
    name: string
    user_id: User['id']
    description?: string
    species: Species
}

const TABLE_NAME = 'FOOD'

export default class FoodDAO extends BaseDAO<Food> {
    constructor() { 
        super(TABLE_NAME) 
        this.$init()
    }
    private $init() {
        const db = SQLiteDB.getInstance()
        db.execAsync(
            [{ sql: `create table if not exists ${TABLE_NAME} 
                    (id integer primary key autoincrement not null, 
                        name text, description text, species text, 
                        user_id integer, ubication_id integer,
                     foreign key(user_id) references USER(id));`,
            args: []}], false)
        .catch(err => console.error('Error al instanciar la tabla', err))
    }

    async insertOne(data: Omit<Food, 'id'>): Promise<number | undefined> {
        try {
            const db = SQLiteDB.getInstance()
            const res = await db.execAsync([
                { sql: `
                    insert into ${TABLE_NAME} (name, user_id, description, species) values (?,?,?,?)
                `, args: [data.name, data.user_id, data.description, data.species]}
            ], false)
            return res[0].insertId
        } catch(err) {
            if (err instanceof Error) throw err
            throw new Error('Error al insertar elemento')
        }
    }
}