'use strict'

import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_activation_codes', table => {
    table.uuid('key').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('userKey').index().references('key').inTable('users')
    table.integer('code')
    table
      .timestamp('expiredAt')
      .defaultTo(knex.raw("NOW() + INTERVAL '24 HOURS'"))
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
    table.timestamp('deletedAt')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_activation_codes')
}
