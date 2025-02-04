import { FastifySchema } from 'fastify'

export const expensesTypesListAllSchema: FastifySchema = {
  description: 'List all expenses types',
  tags: ['Configurations'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: {
      description: 'Successfull list all expenses types',
      type: 'array',
      properties: {
        key: { type: 'string', description: 'Expense type key' },
        name: { type: 'string', description: 'Expense type name' },
      },
    },
  },
}

export const expensesTypesCreateSchema: FastifySchema = {
  description: 'List all expenses types',
  tags: ['Configurations'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  body: {
    properties: {
      name: { type: 'string', description: 'Expense type name' },
    },
  },
  response: {
    201: {},
  },
}
