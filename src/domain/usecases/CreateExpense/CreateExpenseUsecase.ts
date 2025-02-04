import { inject, injectable } from 'tsyringe'

import { IExpenseRepository } from '@/domain/ports/ExpenseRepository.types'
import { Expense } from '@/domain/entities/Expense.types'
import { ICreateExpenseUsecaseDTO } from '@/domain/usecases/CreateExpense/CreateExpenseUsecaseDTO'
import { IExpenseTypeRepository } from '@/domain/ports/ExpenseTypeRepository.types'
import { ExpenseType } from '@/domain/entities/ExpenseType.types'

@injectable()
export class CreateExpenseUsecase {
  constructor(
    @inject('IExpenseTypeRepository')
    private expenseTypeRepository: IExpenseTypeRepository,
    @inject('IExpenseRepository') private expenseRepository: IExpenseRepository,
  ) {}

  async handle(data: ICreateExpenseUsecaseDTO) {
    if (!data.userKey) throw new Error('User is required', { cause: 400 })
    if (!data.description)
      throw new Error('Description is required', { cause: 400 })
    if (!data.typeId) throw new Error('Type is required', { cause: 400 })
    if (!data.value) throw new Error('Value is required', { cause: 400 })
    if (!data.date) throw new Error('Date is required', { cause: 400 })

    const expense = new Expense({
      userKey: data.userKey,
      type: new ExpenseType({ key: data.typeId }),
      description: data.description,
      value: data.value,
      date: data.date,
    })

    const isExpenseTypeExists =
      await this.expenseTypeRepository.getWithTypeByUserKey(data.typeId)

    if (!isExpenseTypeExists)
      throw new Error('Type does not exists', { cause: 400 })

    await this.expenseRepository.create(expense)
  }
}
