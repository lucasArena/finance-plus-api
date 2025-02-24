import { ValidateUserCodeUsecase } from '@/domain/usecases/ValidateUserEmailCode/ValidateUserEmailCodeUsecase'
import { ValidateUserEmailCodeUsecaseDTO } from '@/domain/usecases/ValidateUserEmailCode/ValidateUserEmailCodeUsecaseDTO'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export const ValidateUserEmailCodeController = async (
  request: FastifyRequest<{
    Body: ValidateUserEmailCodeUsecaseDTO
  }>,
  response: FastifyReply,
) => {
  const { code, userKey } = request.body

  await container.resolve(ValidateUserCodeUsecase).handle({
    userKey,
    code,
  })

  return response.status(204).send()
}
