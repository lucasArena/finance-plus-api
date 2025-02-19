import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { ListAllExpenseCategoriesUsecase } from '@/domain/usecases/ListAllExpenseCategoriesUsecase/ListAllExpenseCategoriesUsecase'

export const ListAllExpenseCategoriesController = async (
  _request: FastifyRequest,
  response: FastifyReply,
) => {
  const expensesTypes = await container
    .resolve(ListAllExpenseCategoriesUsecase)
    .handle()

  return response
    .status(200)
    .send(expensesTypes.map(type => ({ key: type.key, name: type.name })))
}
