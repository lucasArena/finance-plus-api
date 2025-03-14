import { Expense } from '@/domain/entities/Expense.types'

export interface IExpenseGrouped {
  typeId: string
  name: string
  color: string
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
  getByKey(key: string): Promise<Expense | null>
  create: (expense: Expense) => Promise<void>
  edit: (expense: Expense) => Promise<void>
  delete: (key: string) => Promise<void>
}
