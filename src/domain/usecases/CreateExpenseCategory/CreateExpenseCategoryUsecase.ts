import { inject, injectable } from 'tsyringe'

import { IExpenseCategoryRepository } from '@/domain/ports/ExpenseCategoryRepository.types'
import { ICreateExpenseCategoryUsecaseDTO } from '@/domain/usecases/CreateExpenseCategory/CreateExpenseCategoryUsecaseDTO'
import { ExpenseCategory } from '@/domain/entities/ExpenseCategory.types'

@injectable()
export class CreateExpenseCategoryUsecase {
  constructor(
    @inject('IExpenseCategoryRepository')
    private expenseCategoryRepository: IExpenseCategoryRepository,
  ) {}

  async handle(data: ICreateExpenseCategoryUsecaseDTO) {
    if (!data.name) throw new Error('Name is required', { cause: 400 })

    const expenseCategory = new ExpenseCategory({ name: data.name })

    const isExpenseCategoryExists =
      await this.expenseCategoryRepository.getByName(expenseCategory)

    if (isExpenseCategoryExists)
      throw new Error('Expense type name already exists', { cause: 400 })

    await this.expenseCategoryRepository.create(expenseCategory)
  }
}
