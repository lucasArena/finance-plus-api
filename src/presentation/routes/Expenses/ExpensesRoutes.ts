import { server } from '@/infra/http/HttpServer'

import { CreateExpenseController } from '@/presentation/controllers/Expense/CreateExpenseController'
import { DeleteExpenseController } from '@/presentation/controllers/Expense/DeleteExpenseController'
import { EditExpenseController } from '@/presentation/controllers/Expense/EditExpenseController'
import { AuthorizationMiddleware } from '@/presentation/middlewares/AuthorizationMiddleware'
import {
  expensesDeleteSchema,
  expensesEditSchema,
  expensesSchema,
} from '@/presentation/routes/Expenses/ExpensesRoutesSchema'

export const expensesRoutes = () => {
  server.post(
    '/expenses',
    {
      preHandler: new AuthorizationMiddleware().handle,
      schema: expensesSchema,
    },
    CreateExpenseController,
  )

  server.put(
    '/expenses/:key',
    {
      preHandler: new AuthorizationMiddleware().handle,
      schema: expensesEditSchema,
    },
    EditExpenseController,
  )

  server.delete(
    '/expenses/:key',
    {
      preHandler: new AuthorizationMiddleware().handle,
      schema: expensesDeleteSchema,
    },
    DeleteExpenseController,
  )
}
