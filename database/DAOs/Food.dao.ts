import BaseDAO from "./Base.dao";
import { Ubication } from "./Ubication.dao";
import { User } from "./User.dao";

export type Species = 'PIG' | 'FISH' | 'BOVINE' | 'AVIAR'

export type Food = {
    id: string
    ubication_id?: Ubication['id']
    user_id: User['id']
    quantity: number
    description?: string
    species: Species
}

const TABLE_NAME = 'FOOD'

export default class FoodDAO extends BaseDAO<Food> {
    constructor() { super(TABLE_NAME) }
    
}