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
    if (!data.userKey) throw new Error('Usuário é obrigatório', { cause: 500 })
    if (!data.page) throw new Error('Pagina é obrigatório', { cause: 500 })
    if (!data.pageSize)
      throw new Error('Tamanho da página é obrigatório', { cause: 400 })
    if (!data.month) throw new Error('Mês é obrigatório', { cause: 400 })
    if (!data.year) throw new Error('Ano é obrigatório', { cause: 400 })

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
    const safeTotalPages = totalPages === 0 ? 1 : totalPages

    return {
      page: data.page,
      pageSize: data.pageSize,
      total: userTotalExpenses,
      totalPages: safeTotalPages,
      items: userExpenses,
    }
  }
}
