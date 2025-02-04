import { container } from 'tsyringe'
import { FastifyReply, FastifyRequest } from 'fastify'

import { ICreateExpenseUsecaseDTO } from '@/domain/usecases/CreateExpense/CreateExpenseUsecaseDTO'
import { CreateExpenseUsecase } from '@/domain/usecases/CreateExpense/CreateExpenseUsecase'

export const CreateExpenseController = async (
  request: FastifyRequest<{ Body: ICreateExpenseUsecaseDTO }>,
  response: FastifyReply,
) => {
  const userKey = request.userKey as string
  const { typeId, description, value, date } = request.body

  await container
    .resolve(CreateExpenseUsecase)
    .handle({ typeId, description, value, date, userKey })

  return response.status(201).send()
}
