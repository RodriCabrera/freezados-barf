import BaseDAO from "./Base.dao"
import SQLiteDB from "../SQLite.database"
import { Ubication } from "./Ubication.dao"
import { User } from "./User.dao"

export type Species = 'PIG' | 'FISH' | 'BOVINE' | 'AVIAR'

export type Food = {
    id: string
    name: string
    ubication_id?: Ubication['id']
    user_id: User['id']
    quantity: number
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
                        name text, quantity integer, 
                        description text, species text, 
                        user_id integer, ubication_id integer
                     foreign key(user_id) references USER(id),
                     foreign key(ubication_id) references UBICATION(id));`,
            args: []}], false)
        .catch(err => console.error('Error al instanciar la tabla', err))
    }
}