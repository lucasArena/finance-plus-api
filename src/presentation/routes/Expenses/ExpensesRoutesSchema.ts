import { FastifySchema } from 'fastify'

export const expensesSchema: FastifySchema = {
  description: 'Create a new expense for a user endpoint',
  tags: ['Expenses'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  body: {
    properties: {
      typeId: {
        type: 'string',
        description: 'Expense type',
      },
      description: {
        type: 'string',
        description: 'Expense description',
      },
      value: {
        type: 'number',
        description: 'Expense value',
      },
      date: {
        type: 'string',
        description: 'Expense date',
      },
    },
  },
  response: {
    201: {},
  },
}
