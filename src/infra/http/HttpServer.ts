import { fastify } from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

const server = fastify()

export { server, swagger, swaggerUi }
