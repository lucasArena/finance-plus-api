import { inject, injectable } from 'tsyringe'

import { IExpenseRepository } from '@/domain/ports/ExpenseRepository.types'
import { Expense } from '@/domain/entities/Expense.types'
import { ICreateExpenseUsecaseDTO } from '@/domain/usecases/CreateExpense/CreateExpenseUsecaseDTO'
import { IExpenseCategoryRepository } from '@/domain/ports/ExpenseCategoryRepository.types'
import { ExpenseCategory } from '@/domain/entities/ExpenseCategory.types'

@injectable()
export class CreateExpenseUsecase {
  constructor(
    @inject('IExpenseCategoryRepository')
    private expenseCategoryRepository: IExpenseCategoryRepository,
    @inject('IExpenseRepository') private expenseRepository: IExpenseRepository,
  ) {}

  async handle(data: ICreateExpenseUsecaseDTO) {
    if (!data.userKey) throw new Error('Usuário é obrigatório', { cause: 400 })
    if (!data.typeId) throw new Error('Tipo é obrigatório', { cause: 400 })
    if (!data.value) throw new Error('Valor obrigatório', { cause: 400 })
    if (!data.date) throw new Error('Data é obrigatório', { cause: 400 })

    const expense = new Expense({
      userKey: data.userKey,
      type: new ExpenseCategory({ key: data.typeId }),
      description: data.description,
      value: data.value,
      date: data.date,
    })

    const isExpenseCategoryExists =
      await this.expenseCategoryRepository.getWithTypeByUserKey(data.typeId)

    if (!isExpenseCategoryExists)
      throw new Error('Type does not exists', { cause: 400 })

    await this.expenseRepository.create(expense)
  }
}
