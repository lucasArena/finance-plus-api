import { server } from '@/infra/http/HttpServer'

import { CreateExpenseController } from '@/presentation/controllers/Expense/CreateExpenseController'
import { AuthorizationMiddleware } from '@/presentation/middlewares/AuthorizationMiddleware'
import { expensesSchema } from '@/presentation/routes/Expenses/ExpensesRoutesSchema'

export const expensesRoutes = () => {
  server.post(
    '/expenses',
    {
      preHandler: new AuthorizationMiddleware().handle,
      schema: expensesSchema,
    },
    CreateExpenseController,
  )
}
