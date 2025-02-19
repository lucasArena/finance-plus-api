import { server } from '@/infra/http/HttpServer'

import { SendActivationCodeEmailController } from '@/presentation/controllers/UserActivationCode/SendActivationCodeEmailController'
import { AuthorizationMiddleware } from '@/presentation/middlewares/AuthorizationMiddleware'
import { userActivationCodeSendSchema } from '@/presentation/routes/UserActivationCode/UserActivationCodeRoutesSchema'

export const userActivationCodeRoutes = () => {
  server.post(
    '/userActivationCode/send',
    {
      preHandler: new AuthorizationMiddleware().handle,
      schema: userActivationCodeSendSchema,
    },
    SendActivationCodeEmailController,
  )
}
