import { container } from 'tsyringe'
import { FastifyReply, FastifyRequest } from 'fastify'

import { ConfirmForgetPasswordUsecase } from '@/domain/usecases/ConfirmForgetPassword/ConfirmForgetPasswordUsecase'
import { ConfirmForgetPasswordUsecaseDTO } from '@/domain/usecases/ConfirmForgetPassword/ConfirmForgetPasswordUsecaseDTO'

export const ConfirmForgetPasswordController = async (
  request: FastifyRequest<{
    Body: ConfirmForgetPasswordUsecaseDTO
  }>,
  response: FastifyReply,
) => {
  const { email, password, passwordConfirmation } = request.body

  await container.resolve(ConfirmForgetPasswordUsecase).handle({
    email,
    password,
    passwordConfirmation,
  })

  return response.status(204).send()
}
