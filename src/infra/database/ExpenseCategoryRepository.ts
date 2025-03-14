import {
  ExpenseCategory,
  IExpenseCategory,
} from '@/domain/entities/ExpenseCategory.types'
import { IExpenseCategoryRepository } from '@/domain/ports/ExpenseCategoryRepository.types'
import { Knex } from '@/infra/database/DatabaseConfig'

export class ExpenseCategoryRepository implements IExpenseCategoryRepository {
  async getAll(): Promise<ExpenseCategory[]> {
    const expenseCategories = await Knex<IExpenseCategory>(
      'expenses_categories',
    )

    return expenseCategories.map(
      expenseCategory =>
        new ExpenseCategory({
          key: expenseCategory.key,
          name: expenseCategory.name,
          color: expenseCategory.color,
          createdAt: expenseCategory.createdAt,
          updatedAt: expenseCategory.updatedAt,
        }),
    )
  }

  async getByName(data: ExpenseCategory): Promise<ExpenseCategory | null> {
    const expenseCategory = await Knex<IExpenseCategory>('expenses_categories')
      .where({
        name: data.name,
      })
      .first()

    if (!expenseCategory) return null

    return new ExpenseCategory({
      key: expenseCategory.key,
      name: expenseCategory.name,
      color: expenseCategory.color,
      createdAt: expenseCategory.createdAt,
      updatedAt: expenseCategory.updatedAt,
    })
  }

  async getWithTypeByUserKey(key: string): Promise<ExpenseCategory | null> {
    const expenseCategory = await Knex<IExpenseCategory>('expenses_categories')
      .where({
        key,
      })
      .first()

    if (!expenseCategory) return null

    return new ExpenseCategory({
      key: expenseCategory.key,
      name: expenseCategory.name,
      color: expenseCategory.color,
      createdAt: expenseCategory.createdAt,
      updatedAt: expenseCategory.updatedAt,
    })
  }

  async create(expenseCategory: ExpenseCategory): Promise<void> {
    await Knex<IExpenseCategory>('expenses_categories').insert({
      name: expenseCategory.name,
    })
  }
}
