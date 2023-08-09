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
      await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(`create table if not exists ${TABLE_NAME} 
        (id integer primary key autoincrement not null, name text, email text);`)
      })
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Error al iniciar la tabla')
    }
  }

  async insertOne(data: Omit<User, 'id'>) {
    try {
      let insertId: number | undefined
      await db.transactionAsync(async (tx) => {
        const res = await tx.executeSqlAsync(
          `insert into ${TABLE_NAME} (email, name) values (?, ?);`,
          [data.email ?? '', data.name ?? '']
        )
        if (this.checkError(res)) {
          insertId = res.insertId
        }
      })
      return insertId
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Failed to create User')
    }
  }
}
