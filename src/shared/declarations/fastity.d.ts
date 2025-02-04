import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    userKey?: string
  }
}
