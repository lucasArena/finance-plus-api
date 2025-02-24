import { server } from '@/infra/http/HttpServer'

import { ListUserExpensesController } from '@/presentation/controllers/User/ListUserExpensesController'
import { ListUserExpensesGroupedController } from '@/presentation/controllers/User/ListUserExpensesGroupedController'
import { SignInUserController } from '@/presentation/controllers/User/SignInUserController'
import { SignUpUserController } from '@/presentation/controllers/User/SignUpUserController'
import { AuthorizationMiddleware } from '@/presentation/middlewares/AuthorizationMiddleware'
import {
  confirmForgetPasswordSchema,
  sendUserEmailCodeSchema,
  sendUserForgetPasswordCodeSchema,
  usersExpensesGroupedSchema,
  usersExpensesSchema,
  usersSignInSchema,
  usersSignUpSchema,
  validateUserCodeForgetPasswordSchema,
  validateUserEmailCodeSchema,
} from '@/presentation/routes/User/UserRoutesSchema'
import { SendUserEmailCodeController } from '@/presentation/controllers/User/SendUserEmailCodeController'
import { ValidateUserEmailCodeController } from '@/presentation/controllers/User/ValidateUserEmailCodeController'
import { SendUserForgetPasswordCodeController } from '@/presentation/controllers/User/SendUserForgetPasswordCodeController'
import { ConfirmForgetPasswordController } from '@/presentation/controllers/User/ConfirmForgetPasswordController'
import { ValidateUserCodeForgetPasswordController } from '@/presentation/controllers/User/ValidateUserCodeForgetPasswordController'

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
    '/users/code/email/send',
    {
      schema: sendUserEmailCodeSchema,
    },
    SendUserEmailCodeController,
  )

  server.post(
    '/users/code/forget-password/send',
    {
      schema: sendUserForgetPasswordCodeSchema,
    },
    SendUserForgetPasswordCodeController,
  )
  server.post(
    '/users/code/forget-password/validate',
    {
      schema: validateUserCodeForgetPasswordSchema,
    },
    ValidateUserCodeForgetPasswordController,
  )
  server.patch(
    '/users/password',
    {
      schema: confirmForgetPasswordSchema,
    },
    ConfirmForgetPasswordController,
  )

  server.post(
    '/users/code/email/validate',
    {
      schema: validateUserEmailCodeSchema,
    },
    ValidateUserEmailCodeController,
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
