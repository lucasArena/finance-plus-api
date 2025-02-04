import { server } from '@/infra/http/HttpServer'

import { CreateExpenseTypeController } from '@/presentation/controllers/ExpenseType/CreateExpenseTypeController'
import { ListAllExpenseTypesController } from '@/presentation/controllers/ExpenseType/ListAllExpenseTypesController'
import { AuthorizationMiddleware } from '@/presentation/middlewares/AuthorizationMiddleware'
import {
  expensesTypesCreateSchema,
  expensesTypesListAllSchema,
} from '@/presentation/routes/Configurations/ExpensesTypes/ExpensesTypesRoutesSchema'

export const expensesTypesRoutes = () => {
  server.get(
    '/configurations/expenses/types',
    {
      preHandler: new AuthorizationMiddleware().handle,
      schema: expensesTypesListAllSchema,
    },
    ListAllExpenseTypesController,
  )
  server.post(
    '/configurations/expenses/types',
    {
      preHandler: new AuthorizationMiddleware().handle,
      schema: expensesTypesCreateSchema,
    },
    CreateExpenseTypeController,
  )
}
