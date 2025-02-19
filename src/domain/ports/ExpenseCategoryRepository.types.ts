import { ExpenseCategory } from '@/domain/entities/ExpenseCategory.types'

export interface IExpenseCategoryRepository {
  getAll: () => Promise<ExpenseCategory[]>
  create: (expenseCategory: ExpenseCategory) => Promise<void>
  getByName: (
    expenseCategory: ExpenseCategory,
  ) => Promise<ExpenseCategory | null>
  getWithTypeByUserKey: (key: string) => Promise<ExpenseCategory | null>
}
