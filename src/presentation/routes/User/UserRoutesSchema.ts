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

export const sendUserEmailCodeSchema: FastifySchema = {
  description: 'User send code endpoint to user email',
  tags: ['Users'],
  body: {
    type: 'object',
    required: ['userKey'],
    properties: {
      userKey: {
        type: 'string',
        format: 'email',
        description: 'userKey',
      },
    },
  },
  response: {
    204: {},
  },
}

export const sendUserForgetPasswordCodeSchema: FastifySchema = {
  description: 'Send user forget password code endpoint to user email',
  tags: ['Users'],
  body: {
    type: 'object',
    required: ['email'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'email',
      },
    },
  },
  response: {
    204: {},
  },
}

export const validateUserCodeForgetPasswordSchema: FastifySchema = {
  description: 'User code validation on forget password flow',
  tags: ['Users'],
  body: {
    type: 'object',
    required: ['email', 'code'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Email',
      },
      code: {
        type: 'string',
        description: 'Validation code',
      },
    },
  },
  response: {
    201: {},
  },
}

export const confirmForgetPasswordSchema: FastifySchema = {
  description: 'Confirm the change of the password',
  tags: ['Users'],
  body: {
    type: 'object',
    required: ['email', 'password', 'passwordConfirmation'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'email',
      },
      password: {
        type: 'string',
        description: 'Password',
      },
      passwordConfirmation: {
        type: 'string',
        description: 'Password confirmation',
      },
    },
  },
  response: {
    204: {},
  },
}

export const validateUserEmailCodeSchema: FastifySchema = {
  description: 'User validation code',
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: ['Users'],
  body: {
    type: 'object',
    required: ['code'],
    properties: {
      code: {
        type: 'number',
        description: 'Validation code',
      },
    },
  },
  response: {
    201: {},
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
            key: { type: 'string', description: 'Expense key' },
            createdAt: { type: 'string', description: 'Expense creation date' },
            updatedAt: { type: 'string', description: 'Expense updated date' },
            type: { type: 'object', name: 'Expense type' },
            description: { type: 'string', description: 'Expense description' },
            value: { type: 'string', description: 'Expense value' },
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
