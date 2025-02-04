import { inject, injectable } from 'tsyringe'
import { IExpenseRepository } from '@/domain/ports/ExpenseRepository.types'
import { IListUserExpensesDTO } from '@/domain/usecases/ListUserExpenses/LisUserExpensesDTO'
import { Expense } from '@/domain/entities/Expense.types'

@injectable()
export class ListUserExpensesUsecase {
  constructor(
    @inject('IExpenseRepository') private expenseRepository: IExpenseRepository,
  ) {}

  async handle(data: IListUserExpensesDTO) {
    if (!data.userKey) throw new Error('User is required', { cause: 400 })
    if (!data.page) throw new Error('Page is required', { cause: 400 })
    if (!data.pageSize) throw new Error('Page size is required', { cause: 400 })
    if (!data.month) throw new Error('Month is required', { cause: 400 })
    if (!data.year) throw new Error('Year is required', { cause: 400 })

    const expense = new Expense({
      userKey: data.userKey,
      date: `${data.year}-${data.month}-01`,
    })

    const offset = (data.page - 1) * data.pageSize
    const userExpenses =
      await this.expenseRepository.getWithTypeByUserKeyAndDate(
        expense,
        offset,
        data.pageSize,
      )

    const userTotalExpenses =
      await this.expenseRepository.getTotalByUserKeyAndDate(expense)

    const totalPages = Math.ceil(userTotalExpenses / data.pageSize)

    return {
      page: data.page,
      pageSize: data.pageSize,
      total: userTotalExpenses,
      totalPages,
      items: userExpenses,
    }
  }
}
