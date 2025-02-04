import { container } from 'tsyringe'
import { FastifyReply, FastifyRequest } from 'fastify'

import { ListUserExpensesUsecase } from '@/domain/usecases/ListUserExpenses/LisUserExpenses'
import { IListUserExpensesDTO } from '@/domain/usecases/ListUserExpenses/LisUserExpensesDTO'

export const ListUserExpensesController = async (
  request: FastifyRequest<{ Body: unknown; Querystring: IListUserExpensesDTO }>,
  response: FastifyReply,
) => {
  const userKey = request.userKey

  const { page, pageSize, month, year } = request.query

  const expenses = await container
    .resolve(ListUserExpensesUsecase)
    .handle({ userKey, page, pageSize, month, year })

  return response.status(200).send(expenses)
}
