import { inject, injectable } from 'tsyringe'

import { IExpenseTypeRepository } from '@/domain/ports/ExpenseTypeRepository.types'
import { ICreateExpenseTypeUsecaseDTO } from '@/domain/usecases/CreateExpenseType/CreateExpenseTypeUsecaseDTO'
import { ExpenseType } from '@/domain/entities/ExpenseType.types'

@injectable()
export class CreateExpenseTypeUsecase {
  constructor(
    @inject('IExpenseTypeRepository')
    private expenseTypeRepository: IExpenseTypeRepository,
  ) {}

  async handle(data: ICreateExpenseTypeUsecaseDTO) {
    if (!data.name) throw new Error('Name is required', { cause: 400 })

    const expenseType = new ExpenseType({ name: data.name })

    const isExpenseTypeExists =
      await this.expenseTypeRepository.getByName(expenseType)

    if (isExpenseTypeExists)
      throw new Error('Expense type name already exists', { cause: 400 })

    await this.expenseTypeRepository.create(expenseType)
  }
}
