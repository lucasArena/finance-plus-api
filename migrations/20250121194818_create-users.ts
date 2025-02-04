'use strict'

import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', table => {
    table.uuid('key').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('name')
    table.string('email')
    table.string('password')
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
    table.timestamp('deletedAt')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}
