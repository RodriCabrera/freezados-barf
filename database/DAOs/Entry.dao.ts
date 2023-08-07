import BaseDAO from './Base.dao'
import SQLiteDB from '../SQLite.database'

import { type Food } from './Food.dao'
import { type Ubication } from './Ubication.dao'
import { type User } from './User.dao'

interface Entry {
  id: number
  user_id: User['id']
  ubication_id: Ubication['id']
  food_id: Food['id']
  date_stored?: number
  date_ready?: number
  quantity: number
  taken: boolean
}

const TABLE_NAME = 'ENTRY'

export default class EntryDAO extends BaseDAO<Entry> {
  constructor() {
    super(TABLE_NAME)
    this.$init()
  }

  private $init() {
    const db = SQLiteDB.getInstance()
    db.execAsync(
      [
        {
          sql: `create table if not exists ${TABLE_NAME} 
                    (id integer primary key autoincrement not null,  
                        user_id integer, ubication_id integer,
                        food_id integer, date_stored integer,
                        date_ready integer, quantity integer,
                        taken integer default 0,
                     foreign key(user_id) references USER(id),
                     foreign key(ubication_id) references UBICATION(id),
                     foreign key(food_id) references FOOD(id));`,
          args: []
        }
      ],
      false
    ).catch((err) => {
      console.error('Error al instanciar la tabla', err)
    })
  }

  async insertOne(data: Omit<Entry, 'id'>): Promise<number | undefined> {
    try {
      const db = SQLiteDB.getInstance()
      const res = await db.execAsync(
        [
          {
            sql: `
                    insert into ${TABLE_NAME} (food_id, ubication_id, user_id, quantity, date_stored, date_ready)
                    values (?,?,?,?,?,?)
                `,
            args: [
              data.food_id,
              data.ubication_id,
              data.user_id,
              data.quantity,
              data.date_stored ?? Date.now(),
              data.date_ready
            ]
          }
        ],
        false
      )
      return res[0].insertId
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Error al insertar elemento')
    }
  }
}
