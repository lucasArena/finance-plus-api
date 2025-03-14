import { inject, injectable } from 'tsyringe'

import { IExpenseRepository } from '@/domain/ports/ExpenseRepository.types'
import { Expense } from '@/domain/entities/Expense.types'
import { IExpenseCategoryRepository } from '@/domain/ports/ExpenseCategoryRepository.types'
import { ExpenseCategory } from '@/domain/entities/ExpenseCategory.types'
import { IEditExpenseUsecaseDTO } from '@/domain/usecases/EditExpense/EditExpenseUsecaseDTO'

@injectable()
export class EditExpenseUsecase {
  constructor(
    @inject('IExpenseCategoryRepository')
    private expenseCategoryRepository: IExpenseCategoryRepository,
    @inject('IExpenseRepository') private expenseRepository: IExpenseRepository,
  ) {}

  async handle(data: IEditExpenseUsecaseDTO) {
    if (!data.userKey) throw new Error('Usuário é obrigatório', { cause: 500 })
    if (!data.key) throw new Error('Chave é obrigatório', { cause: 500 })

    if (!data.typeId) throw new Error('Tipo é obrigatório', { cause: 400 })
    if (!data.value) throw new Error('Valor é obrigatório', { cause: 400 })
    if (!data.date) throw new Error('Data é obrigatória', { cause: 400 })

    const expense = new Expense({
      key: data.key,
      userKey: data.userKey,
      type: new ExpenseCategory({ key: data.typeId }),
      description: data.description,
      value: data.value,
      date: data.date,
    })

    const isExpenseCategoryExists =
      await this.expenseCategoryRepository.getWithTypeByUserKey(data.typeId)

    if (!isExpenseCategoryExists)
      throw new Error('Tipo de despesa não existe', { cause: 400 })

    const isExpenseExists = await this.expenseRepository.getByKey(data.key)

    if (!isExpenseExists) throw new Error('Despesa não existe', { cause: 400 })

    await this.expenseRepository.edit(expense)
  }
}
