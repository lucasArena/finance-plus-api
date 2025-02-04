import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { ListAllExpenseTypesUsecase } from '@/domain/usecases/ListAllExpenseTypesUsecase/ListAllExpenseTypesUsecase'

export const ListAllExpenseTypesController = async (
  _request: FastifyRequest,
  response: FastifyReply,
) => {
  const expensesTypes = await container
    .resolve(ListAllExpenseTypesUsecase)
    .handle()

  return response
    .status(200)
    .send(expensesTypes.map(type => ({ key: type.key, name: type.name })))
}
