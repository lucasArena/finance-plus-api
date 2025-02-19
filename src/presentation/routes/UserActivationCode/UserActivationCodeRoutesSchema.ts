import { FastifySchema } from 'fastify'

export const userActivationCodeSendSchema: FastifySchema = {
  description: 'User activation code endpoint',
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: ['UserActivationCode'],
  response: {
    201: {},
  },
}
