import 'dotenv/config'
import 'reflect-metadata'
import '@/infra/container/container'
import { registerRoutes } from '@/presentation/routes'
import { server } from '@/infra/http/HttpServer'
import { ENV } from '@/shared/utilities/EnvUtil'

import { ErrorHandler } from '@/presentation/handlers/ErrorHandler'

server.setErrorHandler(ErrorHandler.handle)

await registerRoutes()
server.listen({ port: ENV.PORT || 3333, host: '0.0.0.0' })
