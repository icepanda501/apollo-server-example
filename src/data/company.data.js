import db from './knex'
import humps from 'humps'

export default {
    async getCompanies(){
        const companies = await db.select().from('companies')
        return  humps.camelizeKeys(companies)
    },
    async getCompanyById(id) {
        const company = await db('companies').where('id', id).first()
        return  humps.camelizeKeys(company)
    },
    async addCompany(inputCreate){
        const companyId = await db('companies').insert(humps.decamelizeKeys(inputCreate))
        const company = await this.getCompanyById(companyId[0])
        return humps.camelizeKeys(company)
    }
}