import BaseDAO from './Base.dao'
import SQLiteDB from '../SQLite.database'
import { type User } from './User.dao'

const TABLE_NAME = 'UBICATION'

export interface Ubication {
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
      [
        {
          sql: `create table if not exists ${TABLE_NAME} 
                    (id integer primary key autoincrement not null, 
                        name text, ubication text, 
                        description text, isFreezer integer, 
                        user_id integer,
                     foreign key(user_id) references USER(id));`,
          args: []
        }
      ],
      false
    ).catch((err) => {
      console.error('Error al instanciar la tabla', err)
    })
  }

  async insertOne(data: Omit<Ubication, 'id'>): Promise<number | undefined> {
    try {
      const db = SQLiteDB.getInstance()
      const res = await db.execAsync(
        [
          {
            sql: `insert into ${TABLE_NAME} 
                    (name, description, ubication, isFreezer, user_id) values (?,?,?,?,?)`,
            args: [
              data.name,
              data.description,
              data.ubication,
              data.isFreezer,
              data.user_id
            ]
          }
        ],
        false
      )
      if (this.checkError(res[0])) {
        return res[0].insertId
      }
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Error al insertar elementos')
    }
  }
}
