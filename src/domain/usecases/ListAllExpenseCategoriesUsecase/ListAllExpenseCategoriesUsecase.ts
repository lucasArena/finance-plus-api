import { inject, injectable } from 'tsyringe'

import { IExpenseCategoryRepository } from '@/domain/ports/ExpenseCategoryRepository.types'

@injectable()
export class ListAllExpenseCategoriesUsecase {
  constructor(
    @inject('IExpenseCategoryRepository')
    private expenseCategoryRepository: IExpenseCategoryRepository,
  ) {}

  async handle() {
    return await this.expenseCategoryRepository.getAll()
  }
}
