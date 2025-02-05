import { Expense, IExpense } from '@/domain/entities/Expense.types'
import { ExpenseType } from '@/domain/entities/ExpenseType.types'
import {
  IExpenseGrouped,
  IExpenseRepository,
} from '@/domain/ports/ExpenseRepository.types'
import { Knex } from '@/infra/database/DatabaseConfig'

export class ExpenseRepository implements IExpenseRepository {
  constructor() {}
  async getWithTypeByUserKeyAndDate(
    expense: Expense,
    offset: number,
    limit: number,
  ): Promise<Expense[]> {
    const [year, month] = expense.date?.split('-') ?? []

    const response = await Knex('expenses')
      .innerJoin('expenses_types', 'expenses.typeId', 'expenses_types.key')
      .where({
        userKey: expense.userKey,
      })
      .andWhereRaw('EXTRACT(YEAR FROM expenses.date) = ?', [year])
      .andWhereRaw('EXTRACT(MONTH FROM expenses.date) = ?', [month])
      .orderBy('expenses.date', 'desc')
      .offset(offset)
      .limit(limit)

    const userExpenses = response.map(
      expense =>
        new Expense({
          key: expense.key,
          type: new ExpenseType({
            key: expense.key,
            name: expense.name,
          }),
          description: expense.description,
          date: expense.date,
          value: expense.value,
        }),
    )

    return userExpenses
  }

  async getTotalByUserKeyAndDate(expense: Expense): Promise<number> {
    const [year, month] = expense.date?.split('-') ?? []

    const [expensesCount] = await Knex<IExpense>('expenses')
      .where({
        userKey: expense.userKey,
      })
      .andWhereRaw('EXTRACT(MONTH FROM expenses.date) = ?', [month])
      .andWhereRaw('EXTRACT(YEAR FROM expenses.date) = ?', [year])
      .count<[{ count: number }]>('key as count')

    return expensesCount.count
  }

  async getGroupedByUserKeyAndDate(
    expense: Expense,
  ): Promise<IExpenseGrouped[]> {
    const [year, month] = expense.date?.split('-') ?? []

    const response = await Knex('expenses')
      .select('expenses.typeId', 'expenses_types.name')
      .sum<IExpenseGrouped[]>({ total: 'value' })
      .innerJoin('expenses_types', 'expenses.typeId', '=', 'expenses_types.key')
      .where({ userKey: expense.userKey })
      .andWhereRaw('EXTRACT(MONTH FROM expenses.date) = ?', [month])
      .andWhereRaw('EXTRACT(YEAR FROM expenses.date) = ?', [year])
      .groupBy('expenses.typeId', 'expenses_types.name')

    return response.map(expenseGrouped => ({
      typeId: expenseGrouped.typeId,
      name: expenseGrouped.name,
      total: Number(expenseGrouped.total),
    }))
  }

  async create(expense: Expense): Promise<void> {
    await Knex('expenses').insert({
      typeId: expense.type?.key,
      description: expense.description,
      value: expense.value,
      date: expense.date,
      userKey: expense.userKey,
    })
  }
}
