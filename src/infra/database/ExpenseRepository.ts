import { Expense, IExpense } from '@/domain/entities/Expense.types'
import { ExpenseCategory } from '@/domain/entities/ExpenseCategory.types'
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
      .select(
        'expenses.key',
        'expenses.typeId',
        'expenses.description',
        'expenses.date',
        'expenses.value',
        'expenses_categories.name',
      )
      .innerJoin(
        'expenses_categories',
        'expenses.typeId',
        'expenses_categories.key',
      )
      .where({
        userKey: expense.userKey,
      })
      .andWhereRaw('EXTRACT(YEAR FROM expenses.date) = ?', [year])
      .andWhereRaw('EXTRACT(MONTH FROM expenses.date) = ?', [month])
      .whereNull('expenses.deletedAt')
      .orderBy('expenses.date', 'desc')
      .offset(offset)
      .limit(limit)

    const userExpenses = response.map(
      expense =>
        new Expense({
          key: expense.key,
          type: new ExpenseCategory({
            key: expense.typeId,
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
      .whereNull('expenses.deletedAt')
      .count<[{ count: number }]>('key as count')

    return expensesCount.count
  }

  async getGroupedByUserKeyAndDate(
    expense: Expense,
  ): Promise<IExpenseGrouped[]> {
    const [year, month] = expense.date?.split('-') ?? []

    const response = await Knex('expenses')
      .select(
        'expenses.typeId',
        'expenses_categories.name',
        'expenses_categories.color',
      )
      .sum<IExpenseGrouped[]>({ total: 'value' })
      .innerJoin(
        'expenses_categories',
        'expenses.typeId',
        '=',
        'expenses_categories.key',
      )
      .where({ userKey: expense.userKey })
      .andWhereRaw('EXTRACT(MONTH FROM expenses.date) = ?', [month])
      .andWhereRaw('EXTRACT(YEAR FROM expenses.date) = ?', [year])
      .whereNull('expenses.deletedAt')
      .groupBy(
        'expenses.typeId',
        'expenses_categories.name',
        'expenses_categories.color',
      )

    return response.map(expenseGrouped => ({
      typeId: expenseGrouped.typeId,
      name: expenseGrouped.name,
      color: expenseGrouped.color,
      total: Number(expenseGrouped.total),
    }))
  }

  async getByKey(key: string): Promise<Expense | null> {
    const response = await Knex('expenses')
      .where({ key })
      .whereNull('deletedAt')
      .first()

    if (!response) return null

    return new Expense({
      key: response?.key,
      type: new ExpenseCategory({ key: response?.typeId }),
      description: response?.description,
      value: response?.value,
      date: response?.date,
      userKey: response?.userKey,
    })
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

  async edit(expense: Expense): Promise<void> {
    await Knex('expenses')
      .update({
        typeId: expense.type?.key,
        description: expense.description,
        value: expense.value,
        date: expense.date,
      })
      .whereNull('deletedAt')
      .where({ key: expense.key })
  }

  async delete(key: string): Promise<void> {
    await Knex('expenses')
      .update({
        deletedAt: new Date(),
      })
      .whereNull('deletedAt')
      .where({ key })
  }
}
