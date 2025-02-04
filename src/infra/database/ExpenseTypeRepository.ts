import { ExpenseType, IExpenseType } from '@/domain/entities/ExpenseType.types'
import { IExpenseTypeRepository } from '@/domain/ports/ExpenseTypeRepository.types'
import { Knex } from '@/infra/database/DatabaseConfig'

export class ExpenseTypeRepository implements IExpenseTypeRepository {
  async getAll(): Promise<ExpenseType[]> {
    const expenseTypes = await Knex<IExpenseType>('expenses_types')

    return expenseTypes.map(
      expenseType =>
        new ExpenseType({
          key: expenseType.key,
          name: expenseType.name,
          createdAt: expenseType.createdAt,
          updatedAt: expenseType.updatedAt,
        }),
    )
  }

  async getByName(data: ExpenseType): Promise<ExpenseType | null> {
    const expenseType = await Knex<IExpenseType>('expenses_types')
      .where({
        name: data.name,
      })
      .first()

    if (!expenseType) return null

    return new ExpenseType({
      key: expenseType.key,
      name: expenseType.name,
      createdAt: expenseType.createdAt,
      updatedAt: expenseType.updatedAt,
    })
  }

  async getWithTypeByUserKey(key: string): Promise<ExpenseType | null> {
    const expenseType = await Knex<IExpenseType>('expenses_types')
      .where({
        key,
      })
      .first()

    if (!expenseType) return null

    return new ExpenseType({
      key: expenseType.key,
      name: expenseType.name,
      createdAt: expenseType.createdAt,
      updatedAt: expenseType.updatedAt,
    })
  }

  async create(expenseType: ExpenseType): Promise<void> {
    await Knex<IExpenseType>('expenses_types').insert({
      name: expenseType.name,
    })
  }
}
