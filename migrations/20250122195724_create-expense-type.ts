import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('expenses_types', table => {
    table.uuid('key').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('name')
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
    table.timestamp('deletedAt')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('expenses_types')
}
