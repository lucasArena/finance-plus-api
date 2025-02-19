import { userRoutes } from '@/presentation/routes/User/UserRoutes'
import { expensesCategoriesRoutes } from '@/presentation/routes/Configurations/ExpensesCategories/ExpensesCategoriesRoutes'
import { expensesRoutes } from '@/presentation/routes/Expenses/ExpensesRoutes'
import { swaggerBootstrap } from '@/presentation/routes/SwaggerRoutes'
import { userActivationCodeRoutes } from '@/presentation/routes/UserActivationCode/UserActivationCodeRoutes'

export const registerRoutes = async () => {
  await swaggerBootstrap()
  userRoutes()
  userActivationCodeRoutes()
  expensesCategoriesRoutes()
  expensesRoutes()
}
