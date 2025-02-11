import { container } from 'tsyringe'
import { FastifyReply, FastifyRequest } from 'fastify'

import { EditExpenseUsecase } from '@/domain/usecases/EditExpense/EditExpense'
import { IEditExpenseUsecaseDTO } from '@/domain/usecases/EditExpense/EditExpenseUsecaseDTO'

export const EditExpenseController = async (
  request: FastifyRequest<{
    Body: IEditExpenseUsecaseDTO
    Params: { key: string }
  }>,
  response: FastifyReply,
) => {
  const userKey = request.userKey as string
  const { typeId, description, value, date } = request.body
  const { key } = request.params

  await container
    .resolve(EditExpenseUsecase)
    .handle({ key, typeId, description, value, date, userKey })

  return response.status(204).send()
}
