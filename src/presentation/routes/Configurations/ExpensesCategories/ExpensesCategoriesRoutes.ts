import { server } from '@/infra/http/HttpServer'

import { CreateExpenseCategoryController } from '@/presentation/controllers/ExpenseCategory/CreateExpenseCategoryController'
import { ListAllExpenseCategoriesController } from '@/presentation/controllers/ExpenseCategory/ListAllExpenseCategoriesController'
import { AuthorizationMiddleware } from '@/presentation/middlewares/AuthorizationMiddleware'
import {
  expensesTypesCreateSchema,
  expensesTypesListAllSchema,
} from '@/presentation/routes/Configurations/ExpensesCategories/ExpensesCategoriesRoutesSchema'

export const expensesCategoriesRoutes = () => {
  server.get(
    '/configurations/expenses/categories',
    {
      preHandler: new AuthorizationMiddleware().handle,
      schema: expensesTypesListAllSchema,
    },
    ListAllExpenseCategoriesController,
  )
  server.post(
    '/configurations/expenses/categories',
    {
      preHandler: new AuthorizationMiddleware().handle,
      schema: expensesTypesCreateSchema,
    },
    CreateExpenseCategoryController,
  )
}
