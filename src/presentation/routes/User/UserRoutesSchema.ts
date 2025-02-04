import { FastifySchema } from 'fastify'

export const usersSignInSchema: FastifySchema = {
  description: 'User login endpoint',
  tags: ['Users'],
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'User email address',
      },
      password: { type: 'string', description: 'User password' },
    },
  },
  response: {
    200: {
      description: 'Successfull login response',
      type: 'object',
      properties: {
        token: { type: 'string', description: 'JWT token' },
      },
    },
  },
}

export const usersSignUpSchema: FastifySchema = {
  description: 'User sign up endpoint',
  tags: ['Users'],
  body: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: {
        type: 'string',
        description: 'User name',
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'User email address',
      },
      password: { type: 'string', description: 'User password' },
    },
  },
  response: {
    201: {
      description: 'Successfull user creation',
      type: 'object',
    },
  },
}

export const usersExpensesSchema: FastifySchema = {
  description: 'List all users expenses',
  tags: ['Users'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  querystring: {
    type: 'object',
    required: ['page', 'pageSize', 'month', 'year'],
    properties: {
      page: {
        type: 'number',
        description: 'Page',
      },
      pageSize: {
        type: 'number',
        description: 'Page size',
      },
      month: {
        type: 'number',
        description: 'Month to filter size',
      },
      year: {
        type: 'number',
        description: 'Year to filter size',
      },
    },
  },
  response: {
    200: {
      description: 'Successfull list all users expenses',
      type: 'object',
      properties: {
        page: { type: 'number', description: 'Current page' },
        pageSize: { type: 'number', description: 'Page size pagination' },
        total: { type: 'number', description: 'Total items of pagination' },
        totalPages: { type: 'number', description: 'Total pages' },
        items: {
          type: 'array',
          properties: {
            key: { type: 'string', description: 'JWT token' },
            createdAt: { type: 'string', description: 'JWT token' },
            updatedAt: { type: 'string', description: 'JWT token' },
            type: { type: 'object', description: 'JWT token' },
            name: { type: 'string', description: 'JWT token' },
          },
          description: 'Domain items array',
        },
      },
    },
  },
}

export const usersExpensesGroupedSchema: FastifySchema = {
  description: 'List users expenses grouped',
  tags: ['Users'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  querystring: {
    type: 'object',
    required: ['month', 'year'],
    properties: {
      month: {
        type: 'number',
        description: 'Month to filter size',
      },
      year: {
        type: 'number',
        description: 'Year to filter size',
      },
    },
  },
  response: {
    200: {
      description: 'Successfull list all users expenses grouped',
      type: 'array',
      properties: {
        typeId: { type: 'string', description: 'Type uuid' },
        name: { type: 'string', description: 'Type name' },
        total: { type: 'number', description: 'Total of expenses grouped' },
      },
    },
  },
}
