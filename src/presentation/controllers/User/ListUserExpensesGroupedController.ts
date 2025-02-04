import { container } from 'tsyringe'
import { FastifyReply, FastifyRequest } from 'fastify'

import { IListUserExpensesGroupedDTO } from '@/domain/usecases/ListUserExpensesGrouped/ListUserExpensesGroupedDTO'
import { ListUserExpensesGrouped } from '@/domain/usecases/ListUserExpensesGrouped/ListUserExpensesGrouped'

export const ListUserExpensesGroupedController = async (
  request: FastifyRequest<{
    Body: unknown
    Querystring: IListUserExpensesGroupedDTO
  }>,
  response: FastifyReply,
) => {
  const userKey = request.userKey

  const { month, year } = request.query

  const expensesGrouped = await container
    .resolve(ListUserExpensesGrouped)
    .handle({ userKey, month, year })

  return response.status(200).send(expensesGrouped)
}
