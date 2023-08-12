import BaseDAO from './Base.dao'
import db from '../SQLite.database'
import { type Food } from './Food.dao'
import { type Ubication } from './Ubication.dao'
import { type User } from './User.dao'

export interface Entry {
  id: number
  user_id: User['id']
  ubication_id: Ubication['id']
  food_id: Food['id']
  date_stored?: number
  date_ready?: number
  date_consumed?: number | null
  quantity: number
  taken: boolean
}

export interface EntryFull {
  id: number
  user_id: User['id']
  Ubication: Omit<Ubication, 'user_id'>
  Food: Omit<Food, 'user_id'>
  date_stored?: number
  date_ready?: number
  date_consumed?: number | null
  quantity: number
  taken: boolean
}

const TABLE_NAME = 'ENTRY'

export default class EntryDAO extends BaseDAO<Entry> {
  constructor() {
    super(TABLE_NAME)
    this.$init()
  }

  private async $init() {
    try {
      await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(`create table if not exists ${TABLE_NAME} 
        (id integer primary key autoincrement not null,  
            user_id integer, ubication_id integer,
            food_id integer, date_stored integer,
            date_ready integer default NULL, quantity integer,
            taken integer default 0, date_consumed integer default NULL,
         foreign key(user_id) references USER(id),
         foreign key(ubication_id) references UBICATION(id),
         foreign key(food_id) references FOOD(id));`)
      })
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Error al iniciar la tabla')
    }
  }

  async insertOne(data: Omit<Entry, 'id'>): Promise<number | undefined> {
    try {
      let insertId: number | undefined
      await db.transactionAsync(async (tx) => {
        const res = await tx.executeSqlAsync(
          `insert into ${TABLE_NAME} (food_id, ubication_id, user_id, quantity, date_stored, date_ready)
          values (?,?,?,?,?,?)`,
          [
            data.food_id,
            data.ubication_id,
            data.user_id,
            data.quantity,
            data.date_stored ?? Date.now(),
            data.date_ready ?? 0
          ]
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private normalizeFullEntry(row: Record<string, any>): EntryFull {
    return {
      id: row.id,
      taken: row.taken,
      quantity: row.quantity,
      user_id: row.user_id,
      Food: {
        id: row.food_id,
        name: row.food_name,
        species: row.food_species,
        description: row.food_description
      },
      Ubication: {
        id: row.ubication_id,
        name: row.ubication_name,
        isFreezer: !!row.ubication_type,
        description: row.ubication_description,
        ubication: row.ubication_ubication
      },
      date_ready: row.date_ready,
      date_stored: row.date_stored,
      date_consumed: row.date_consumed
    }
  }

  async getAllEntriesByUser(id: User['id']) {
    try {
      let response: EntryFull[] | undefined
      await db.transactionAsync(async (tx) => {
        const res = await tx.executeSqlAsync(
          `
          select e.*, u.name as ubication_name, u.isFreezer as ubication_type, 
            u.description as ubication_description, u.ubication as ubication_ubication,
            f.name as food_name, f.description as food_description, f.species as food_species
          from entry as e inner join food as f on e.food_id = f.id 
          inner join ubication as u on e.ubication_id = u.id 
          where e.user_id = ? and e.taken = 0 and e.date_consumed is null
          order by e.date_ready
        `,
          [id]
        )
        if (this.checkError(res)) {
          response = res.rows.map((row) => this.normalizeFullEntry(row))
        }
      }, true)
      return response
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Error al obtener entradas')
    }
  }

  async getFullEntryById(id: Entry['id']) {
    try {
      let response: EntryFull | undefined
      await db.transactionAsync(async (tx) => {
        const res = await tx.executeSqlAsync(
          `
          select e.*, u.name as ubication_name, u.isFreezer as ubication_type, 
            u.description as ubication_description, u.ubication as ubication_ubication,
            f.name as food_name, f.description as food_description, f.species as food_species
          from entry as e inner join food as f on e.food_id = f.id 
          inner join ubication as u on e.ubication_id = u.id 
          where e.id = ?
          order by e.date_ready
        `,
          [id]
        )
        if (this.checkError(res)) {
          response = this.normalizeFullEntry(res.rows[0])
        }
      }, true)
      return response
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Error al obtener entradas')
    }
  }

  async consumeEntry(id: Entry['id'], quantity: Entry['quantity']) {
    try {
      let response: EntryFull | undefined
      await db.transactionAsync(async (tx) => {
        const res = await tx.executeSqlAsync(
          // if the consumed-quantity = quantity, then set quantity=0 and update the date_consumed
          // if the consumed-quantity < the quantity, then update the quantity.
          // if the consumed-quantity > the quantity, then throw an error
          `UPDATE entry 
           SET 
           quantity = CASE WHEN quantity = ? THEN 0 
                           WHEN quantity > ? THEN quantity - ? 
                           ELSE quantity END,
           date_consumed = CASE WHEN quantity = ? THEN ${Date.now()}
           WHERE id = ?
          `,
          [id, quantity]
        )
        if (this.checkError(res)) {
          response = this.normalizeFullEntry(res.rows[0])
        }
      }, false)
      return response
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Error al obtener entradas')
    }
  }
}
