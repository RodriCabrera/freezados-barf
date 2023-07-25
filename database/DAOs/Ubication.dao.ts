import BaseDAO from "./Base.dao"
import { User } from "./User.dao"
import SQLiteDB from "../SQLite.database"

const TABLE_NAME = 'UBICATION'

export type Ubication = {
    id: number
    name: string
    ubication: string
    description: string
    isFreezer: boolean
    user_id: User['id']
}

export default class UbicationDAO extends BaseDAO<Ubication> {
    constructor() { 
        super(TABLE_NAME)
        this.$init()
    }

    private $init() {
        const db = SQLiteDB.getInstance()
        db.execAsync(
            [{ sql: `create table if not exists ${TABLE_NAME} 
                    (id integer primary key autoincrement not null, 
                        name text, ubication text, 
                        description text, isFreezer integer, 
                        user_id integer,
                     foreign key(user_id) references USER(id));`,
            args: []}], false)
        .catch(err => console.error('Error al instanciar la tabla', err))
    }
}