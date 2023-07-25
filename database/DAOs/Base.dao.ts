import SQLiteDB from "../SQLite.database";

export default class BaseDAO<T> {
    constructor(public tableName: string) {}

    protected _truncate() {
        const db = SQLiteDB.getInstance()
        db.exec([{ sql: `delete from ${this.tableName};`, args: []}], false, (err) => err && console.error(err))
    }

    async getAll(projection: string[] = ['*']) {
        try {
            const db = SQLiteDB.getInstance()
            const res = await db.execAsync([
                { sql: `select ${projection.join(',')} from ${this.tableName};`, args: [] }
            ], true)
            return res[0].rows as T[]
        } catch(err) {
            if (err instanceof Error) throw err
            throw new Error('Failed to get elements')
        }
    }

    async getById(id: number, projection: string[] = ['*']) {
        try {
            const db = SQLiteDB.getInstance()
            const res = await db.execAsync([
                { sql: `select ${projection.join(',')} from ${this.tableName} where id = ? limit 1;`, args: [id] }
            ], true)
            return res[0].rows[0] as T
        } catch(err) {
            if (err instanceof Error) throw err
            throw new Error('Failed to get element')
        }
    }
}