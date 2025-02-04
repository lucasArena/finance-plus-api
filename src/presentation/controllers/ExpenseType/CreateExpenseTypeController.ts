import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { CreateExpenseTypeUsecase } from '@/domain/usecases/CreateExpenseType/CreateExpenseTypeUsecase'
import { ICreateExpenseTypeUsecaseDTO } from '@/domain/usecases/CreateExpenseType/CreateExpenseTypeUsecaseDTO'

export const CreateExpenseTypeController = async (
  request: FastifyRequest<{ Body: ICreateExpenseTypeUsecaseDTO }>,
  response: FastifyReply,
) => {
  const { name } = request.body

  await container.resolve(CreateExpenseTypeUsecase).handle({
    name,
  })

  return response.status(201).send()
}
