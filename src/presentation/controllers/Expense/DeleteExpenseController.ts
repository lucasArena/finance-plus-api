import { container } from 'tsyringe'
import { FastifyReply, FastifyRequest } from 'fastify'

import { DeleteExpenseUsecase } from '@/domain/usecases/DeleteExpense/DeleteExpense'
import { IDeleteExpenseUsecaseDTO } from '@/domain/usecases/DeleteExpense/DeleteExpenseUsecaseDTO'

export const DeleteExpenseController = async (
  request: FastifyRequest<{
    Body: undefined
    Params: IDeleteExpenseUsecaseDTO
  }>,
  response: FastifyReply,
) => {
  const { key } = request.params

  await container.resolve(DeleteExpenseUsecase).handle({ key })

  return response.status(201).send()
}
