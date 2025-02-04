import { ExpenseType } from '@/domain/entities/ExpenseType.types'

export interface IExpenseTypeRepository {
  getAll: () => Promise<ExpenseType[]>
  create: (expenseType: ExpenseType) => Promise<void>
  getByName: (expenseType: ExpenseType) => Promise<ExpenseType | null>
  getWithTypeByUserKey: (key: string) => Promise<ExpenseType | null>
}
