import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { CreateExpenseCategoryUsecase } from '@/domain/usecases/CreateExpenseCategory/CreateExpenseCategoryUsecase'
import { ICreateExpenseCategoryUsecaseDTO } from '@/domain/usecases/CreateExpenseCategory/CreateExpenseCategoryUsecaseDTO'

export const CreateExpenseCategoryController = async (
  request: FastifyRequest<{ Body: ICreateExpenseCategoryUsecaseDTO }>,
  response: FastifyReply,
) => {
  const { name, color } = request.body

  await container.resolve(CreateExpenseCategoryUsecase).handle({
    name,
    color,
  })

  return response.status(201).send()
}
