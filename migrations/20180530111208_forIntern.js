exports.up = (knex, Promise) => knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('first_name')
    table.string('last_name')
    table.string('email')
    table.integer('company_id')
  })
    .createTable('companies', (table) => {
        table.increments()
        table.string('name')
    })

  
  exports.down = (knex, Promise) => knex.schema.dropTableIfExists('users')
    .dropTableIfExists('companies')