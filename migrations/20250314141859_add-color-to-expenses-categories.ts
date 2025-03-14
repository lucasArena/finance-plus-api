import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('expenses_categories', table => {
    table.string('color').notNullable().defaultTo('#000000')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('expenses_categories', table => {
    table.dropColumn('color')
  })
}
