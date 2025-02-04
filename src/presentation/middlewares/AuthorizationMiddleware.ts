import { Token } from '@/infra/token/Token'
import { FastifyReply, FastifyRequest } from 'fastify'

export class AuthorizationMiddleware {
  constructor() {}

  async handle<T>(request: FastifyRequest<{ Body: T }>, reply: FastifyReply) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return reply.code(401).send({ message: 'Authorization token required' })
    }

    const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/)

    if (!tokenMatch) {
      return reply
        .code(400)
        .send({ message: 'Invalid Authorization header format' })
    }

    const token = new Token()

    const tokenRaw = tokenMatch[1]
    const decoded = token.decrypt(tokenRaw)

    if (!decoded) {
      return reply.code(400).send({ message: 'Invalid token' })
    }

    request.userKey = decoded.key
  }
}
