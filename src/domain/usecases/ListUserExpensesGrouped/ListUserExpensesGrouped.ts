import { inject, injectable } from 'tsyringe'
import { IExpenseRepository } from '@/domain/ports/ExpenseRepository.types'
import { Expense } from '@/domain/entities/Expense.types'
import { IListUserExpensesGroupedDTO } from '@/domain/usecases/ListUserExpensesGrouped/ListUserExpensesGroupedDTO'

@injectable()
export class ListUserExpensesGrouped {
  constructor(
    @inject('IExpenseRepository') private expenseRepository: IExpenseRepository,
  ) {}

  async handle(data: IListUserExpensesGroupedDTO) {
    if (!data.userKey) throw new Error('User is required', { cause: 400 })
    if (!data.month) throw new Error('Month is required', { cause: 400 })
    if (!data.year) throw new Error('Year is required', { cause: 400 })

    const expense = new Expense({
      userKey: data.userKey,
      date: `${data.year}-${data.month}-01`,
    })

    return await this.expenseRepository.getGroupedByUserKeyAndDate(expense)
  }
}
