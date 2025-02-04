import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('expenses', table => {
    table.uuid('key').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('typeId').index().references('key').inTable('expenses_types')
    table.string('description')
    table.integer('value')
    table.timestamp('date')
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
    table.timestamp('deletedAt')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('expenses')
}
