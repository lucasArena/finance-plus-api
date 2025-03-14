import { SendUserForgetPasswordCodeDTO } from '@/domain/usecases/SendUserForgetPasswordCode/SendUserForgetPasswordCodeUsecaseDTO'
import { SendUserForgetPasswordCodeUsecase } from '@/domain/usecases/SendUserForgetPasswordCode/SendUserForgetPasswordCodeUsecase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export const SendUserForgetPasswordCodeController = async (
  request: FastifyRequest<{
    Body: SendUserForgetPasswordCodeDTO
  }>,
  response: FastifyReply,
) => {
  const { email } = request.body

  await container.resolve(SendUserForgetPasswordCodeUsecase).handle({
    email,
  })

  return response.status(204).send()
}
