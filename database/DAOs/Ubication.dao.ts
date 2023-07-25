import BaseDAO from "./Base.dao";
import { User } from "./User.dao";

const TABLE_NAME = 'UBICATION'

export type Ubication = {
    id: number
    name: string
    ubication: string
    description: string
    isFreezer: boolean
    user_id: User['id']
}

export default class UbicationDAO extends BaseDAO<Ubication> {
    constructor() { super(TABLE_NAME) }
}