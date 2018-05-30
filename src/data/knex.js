import knex from 'knex'

export default knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    database: 'intern',
    port: '3306',
  },
})
