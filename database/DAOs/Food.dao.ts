import BaseDAO from './Base.dao'
import db from '../SQLite.database'
import { type User } from './User.dao'

export type Species = 'PIG' | 'FISH' | 'BOVINE' | 'AVIAR'

export interface Food {
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

  private async $init() {
    try {
      await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(`create table if not exists ${TABLE_NAME} 
        (id integer primary key autoincrement not null, 
            name text, description text, species text, 
            user_id integer, ubication_id integer,
         foreign key(user_id) references USER(id));`)
      })
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Error al iniciar la tabla')
    }
  }

  async insertOne(data: Omit<Food, 'id'>): Promise<number | undefined> {
    try {
      let insertId: number | undefined
      await db.transactionAsync(async (tx) => {
        const res = await tx.executeSqlAsync(
          `insert into ${TABLE_NAME} (name, user_id, description, species) values (?,?,?,?)`,
          [data.name, data.user_id, data.description ?? '', data.species]
        )
        if (this.checkError(res)) {
          insertId = res.insertId
        }
      })
      return insertId
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Error al insertar elemento')
    }
  }
}
