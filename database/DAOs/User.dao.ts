import BaseDAO from './Base.dao'
import db from '../SQLite.database'

export interface User {
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

  private async $init() {
    try {
      await db.execAsync(
        [
          {
            sql: `create table if not exists ${TABLE_NAME} 
                    (id integer primary key autoincrement not null, name text, email text);`,
            args: []
          }
        ],
        false
      )
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Error al iniciar la tabla')
    }
    // .catch(err => console.error('Error al instanciar la tabla', err))
  }

  async insertOne(data: Omit<User, 'id'>) {
    try {
      const res = await db.execAsync(
        [
          {
            sql: `insert into ${TABLE_NAME} (email, name) values (?, ?);`,
            args: [data.email, data.name]
          }
        ],
        false
      )
      if (this.checkError(res[0])) {
        return res[0].insertId
      }
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Failed to create User')
    }
  }
}
