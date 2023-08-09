import BaseDAO from './Base.dao'
import db from '../SQLite.database'
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

  private async $init() {
    try {
      await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(`create table if not exists ${TABLE_NAME} 
        (id integer primary key autoincrement not null, 
            name text, ubication text, 
            description text, isFreezer integer, 
            user_id integer,
         foreign key(user_id) references USER(id));`)
      })
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Error al iniciar la tabla')
    }
  }

  async insertOne(data: Omit<Ubication, 'id'>): Promise<number | undefined> {
    try {
      let insertId: number | undefined
      await db.transactionAsync(async (tx) => {
        const res = await tx.executeSqlAsync(
          `insert into ${TABLE_NAME} 
            (name, description, ubication, isFreezer, user_id) values (?,?,?,?,?)`,
          [
            data.name,
            data.description,
            data.ubication,
            data.isFreezer ? 0 : 1,
            data.user_id
          ]
        )
        if (this.checkError(res)) {
          insertId = res.insertId
        }
      })
      return insertId
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Error al insertar elementos')
    }
  }
}
