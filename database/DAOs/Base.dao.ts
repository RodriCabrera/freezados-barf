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

  async getAll(projection: string[] = ['*']) {
    try {
      let result: T[] | undefined
      await db.transactionAsync(async (tx) => {
        const res = await tx.executeSqlAsync(
          `select ${projection.join(',')} from ${this.tableName};`
        )
        if (this.checkError(res)) {
          result = res.rows as T[]
        } else {
          result = []
        }
      })
      return result
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Failed to get elements')
    }
  }

  async getById(id: number, projection: string[] = ['*']) {
    try {
      let result: T | undefined
      await db.transactionAsync(async (tx) => {
        const res = await tx.executeSqlAsync(
          `select ${projection.join(',')} from ${
            this.tableName
          } where id = ? limit 1;`,
          [id]
        )
        if (this.checkError(res)) {
          result = res.rows[0] as T
        }
      })
      return result
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
