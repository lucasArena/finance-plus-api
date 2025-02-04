import { inject, injectable } from 'tsyringe'

import { IExpenseTypeRepository } from '@/domain/ports/ExpenseTypeRepository.types'

@injectable()
export class ListAllExpenseTypesUsecase {
  constructor(
    @inject('IExpenseTypeRepository')
    private expenseTypeRepository: IExpenseTypeRepository,
  ) {}

  async handle() {
    return await this.expenseTypeRepository.getAll()
  }
}
