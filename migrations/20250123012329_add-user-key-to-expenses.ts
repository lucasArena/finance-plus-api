import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('expenses', table => {
    table.uuid('userKey').index().references('key').inTable('users')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('expenses', table => {
    table.dropColumn('userKey')
  })
}
