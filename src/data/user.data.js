import db from './knex'
import humps from 'humps'

export default {
    async getUsers(){
        const users = await db.select().from('users')
        return humps.camelizeKeys(users)
    },
    async getUserById(id) {
        const user = await db('users').where('id', id).first()
        return humps.camelizeKeys(user)
    },
    async getUsersByCompanyId(companyId) {
        const users = await db('users').where('company_id',companyId)
        return humps.camelizeKeys(users)
    },
    async addUser(inputCreate){
        const userId = await db('users').insert(humps.decamelizeKeys(inputCreate))
        const user = await this.getUserById(userId[0])
        return humps.camelizeKeys(user)
    }
}