import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { ValidateUserCodeForgetPasswordUsecase } from '@/domain/usecases/ValidateUserCodeForgetPassword/ValidateUserCodeForgetPasswordUsecase'
import { ValidateUserCodeForgetPasswordUsecaseDTO } from '@/domain/usecases/ValidateUserCodeForgetPassword/ValidateUserCodeForgetPasswordUsecaseDTO'

export const ValidateUserCodeForgetPasswordController = async (
  request: FastifyRequest<{
    Body: ValidateUserCodeForgetPasswordUsecaseDTO
  }>,
  response: FastifyReply,
) => {
  const { email, code } = request.body

  await container.resolve(ValidateUserCodeForgetPasswordUsecase).handle({
    email,
    code,
  })

  return response.status(204).send()
}
