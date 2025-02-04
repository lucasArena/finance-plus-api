import { server } from '@/infra/http/HttpServer'

import { ListUserExpensesController } from '@/presentation/controllers/User/ListUserExpensesController'
import { ListUserExpensesGroupedController } from '@/presentation/controllers/User/ListUserExpensesGroupedController'
import { SignInUserController } from '@/presentation/controllers/User/SignInUserController'
import { SignUpUserController } from '@/presentation/controllers/User/SignUpUserController'
import { AuthorizationMiddleware } from '@/presentation/middlewares/AuthorizationMiddleware'
import {
  usersExpensesGroupedSchema,
  usersExpensesSchema,
  usersSignInSchema,
  usersSignUpSchema,
} from '@/presentation/routes/User/UserRoutesSchema'

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
