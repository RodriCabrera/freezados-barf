import SQLiteDB from '../SQLite.database'

export default class BaseDAO<T> {
  constructor(public tableName: string) {}

  private $truncate() {
    const db = SQLiteDB.getInstance()
    db.exec(
      [{ sql: `delete from ${this.tableName};`, args: [] }],
      false,
      (err) => {
        err != null && console.error(err)
      }
    )
  }

  async getAll(projection: string[] = ['*']) {
    try {
      const db = SQLiteDB.getInstance()
      const res = await db.execAsync(
        [
          {
            sql: `select ${projection.join(',')} from ${this.tableName};`,
            args: []
          }
        ],
        true
      )
      return res[0].rows as T[]
    } catch (err) {
      if (err instanceof Error) throw err
      throw new Error('Failed to get elements')
    }
  }

  async getById(id: number, projection: string[] = ['*']) {
    try {
      const db = SQLiteDB.getInstance()
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
      return res[0].rows[0] as T
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

  deleteAll(security: string) {
    if (security === this.tableName) this.$truncate()
  }

  dropTable(security: string) {
    if (security === this.tableName) {
      const db = SQLiteDB.getInstance()
      db.execAsync(
        [{ sql: `drop table if exists ${this.tableName}`, args: [] }],
        false
      )
    }
  }
}
