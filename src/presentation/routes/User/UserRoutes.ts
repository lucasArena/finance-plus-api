import { server } from '@/infra/http/HttpServer'

import { ListUserExpensesController } from '@/presentation/controllers/User/ListUserExpensesController'
import { ListUserExpensesGroupedController } from '@/presentation/controllers/User/ListUserExpensesGroupedController'
import { SignInUserController } from '@/presentation/controllers/User/SignInUserController'
import { SignUpUserController } from '@/presentation/controllers/User/SignUpUserController'
import { AuthorizationMiddleware } from '@/presentation/middlewares/AuthorizationMiddleware'
import {
  sendActivationCodeSchema,
  usersExpensesGroupedSchema,
  usersExpensesSchema,
  usersSignInSchema,
  usersSignUpSchema,
  validateActivationCodeSchema,
} from '@/presentation/routes/User/UserRoutesSchema'
import { SendActivationCodeEmailController } from '@/presentation/controllers/User/SendActivationCodeEmailController'
import { ValidateUserCodeController } from '@/presentation/controllers/User/ValidateUserCodeController'

export const userRoutes = () => {
  server.post(
    '/users/sign-in',
    { schema: usersSignInSchema },
    SignInUserController,
  )
  server.post(
    '/users/sign-up',
    { schema: usersSignUpSchema },
    SignUpUserController,
  )
  server.post(
    '/users/activationcode/send',
    {
      preHandler: new AuthorizationMiddleware().handle,
      schema: sendActivationCodeSchema,
    },
    SendActivationCodeEmailController,
  )

  server.post(
    '/users/activationcode/validate',
    {
      preHandler: new AuthorizationMiddleware().handle,
      schema: validateActivationCodeSchema,
    },
    ValidateUserCodeController,
  )
  server.get(
    '/users/expenses',
    {
      preHandler: new AuthorizationMiddleware().handle,
      schema: usersExpensesSchema,
    },
    ListUserExpensesController,
  )
  server.get(
    '/users/expenses-grouped',
    {
      preHandler: new AuthorizationMiddleware().handle,
      schema: usersExpensesGroupedSchema,
    },
    ListUserExpensesGroupedController,
  )
}
