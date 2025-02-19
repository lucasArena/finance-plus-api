import { inject, injectable } from 'tsyringe'

import { IExpenseRepository } from '@/domain/ports/ExpenseRepository.types'
import { IExpenseCategoryRepository } from '@/domain/ports/ExpenseCategoryRepository.types'
import { IDeleteExpenseUsecaseDTO } from '@/domain/usecases/DeleteExpense/DeleteExpenseUsecaseDTO'

@injectable()
export class DeleteExpenseUsecase {
  constructor(
    @inject('IExpenseCategoryRepository')
    private expenseCategoryRepository: IExpenseCategoryRepository,
    @inject('IExpenseRepository') private expenseRepository: IExpenseRepository,
  ) {}

  async handle(data: IDeleteExpenseUsecaseDTO) {
    if (!data.key) throw new Error('Key is required', { cause: 400 })

    const isExpenseExists = await this.expenseRepository.getByKey(data.key)

    if (!isExpenseExists)
      throw new Error('Expense does not exists', { cause: 400 })

    await this.expenseRepository.delete(data.key)
  }
}
