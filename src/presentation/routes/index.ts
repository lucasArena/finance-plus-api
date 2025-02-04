import { userRoutes } from '@/presentation/routes/User/UserRoutes'
import { expensesTypesRoutes } from '@/presentation/routes/Configurations/ExpensesTypes/ExpensesTypesRoutes'
import { expensesRoutes } from '@/presentation/routes/Expenses/ExpensesRoutes'
import { swaggerBootstrap } from '@/presentation/routes/SwaggerRoutes'

export const registerRoutes = async () => {
  await swaggerBootstrap()
  userRoutes()
  expensesTypesRoutes()
  expensesRoutes()
}
