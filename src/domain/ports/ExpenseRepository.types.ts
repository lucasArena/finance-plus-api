import { Expense } from '@/domain/entities/Expense.types'

export interface IExpenseGrouped {
  typeId: string
  name: string
  total: number
}

export interface IExpenseRepository {
  getWithTypeByUserKeyAndDate: (
    expense: Expense,
    offtset: number,
    limit: number,
  ) => Promise<Expense[]>
  getTotalByUserKeyAndDate: (expense: Expense) => Promise<number>
  getGroupedByUserKeyAndDate: (expense: Expense) => Promise<IExpenseGrouped[]>
  create: (expense: Expense) => Promise<void>
}
