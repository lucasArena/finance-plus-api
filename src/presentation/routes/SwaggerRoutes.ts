import { server, swagger, swaggerUi } from '@/infra/http/HttpServer'

export const swaggerBootstrap = async () => {
  await server.register(swagger, {
    swagger: {
      info: {
        title: 'API Documentation',
        version: '1.0.0',
      },
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
  })
  server.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      deepLinking: true,
      validatorUrl: null,
    },
  })
}
