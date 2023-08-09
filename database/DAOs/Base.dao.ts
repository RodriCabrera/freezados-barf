import db from '../SQLite.database'
import { type ResultSet, type ResultSetError } from 'expo-sqlite'

export default class BaseDAO<T> {
  constructor(public tableName: string) {}

  private async $truncate() {
    try {
      await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(`delete from ${this.tableName};`)
      })
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Error al eliminar datos')
    }
  }

  checkError(response: ResultSet | ResultSetError): response is ResultSet {
    if (Object.hasOwn(response, 'error')) return false
    return true
  }

  // TODO: change to transaction
  async getAll(projection: string[] = ['*']) {
    try {
      const res = await db.execAsync(
        [
          {
            sql: `select ${projection.join(',')} from ${this.tableName};`,
            args: []
          }
        ],
        true
      )
      if (this.checkError(res[0])) {
        return res[0].rows as T[]
      }
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Failed to get elements')
    }
  }

  // TODO: change to transaction
  async getById(id: number, projection: string[] = ['*']) {
    try {
      const res = await db.execAsync(
        [
          {
            sql: `select ${projection.join(',')} from ${
              this.tableName
            } where id = ? limit 1;`,
            args: [id]
          }
        ],
        true
      )
      if (this.checkError(res[0])) {
        return res[0].rows[0] as T
      }
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Failed to get element')
    }
  }

  async insertOne(data: Partial<T>): Promise<number | undefined> {
    console.error('Method not implemented for ', this.tableName)
    return undefined
  }

  async insertMany(data: Array<Partial<T>>): Promise<number[] | undefined> {
    console.error('Method not implemented for ', this.tableName)
    return undefined
  }

  async deleteAll(security: string) {
    if (security === this.tableName) {
      await this.$truncate()
    } else {
      throw new Error('Wrong credentials')
    }
  }

  async dropTable(security: string) {
    try {
      if (security === this.tableName) {
        await db.transactionAsync(async (tx) => {
          await tx.executeSqlAsync(`drop table if exists ${this.tableName}`)
        })
      } else {
        throw new Error('Wrong credentials')
      }
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Failed to get element')
    }
  }
}
