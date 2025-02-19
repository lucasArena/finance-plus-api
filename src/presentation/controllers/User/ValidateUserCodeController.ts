import { ValidateUserCodeUsecase } from '@/domain/usecases/ValidateUserCode/ValidateUserCodeUsecase'
import { IValidateUserCodeUsecaseDTO } from '@/domain/usecases/ValidateUserCode/ValidateUserCodeUsecaseDTO'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export const ValidateUserCodeController = async (
  request: FastifyRequest<{
    Body: IValidateUserCodeUsecaseDTO
  }>,
  response: FastifyReply,
) => {
  const userKey = request.userKey
  const { code } = request.body

  await container.resolve(ValidateUserCodeUsecase).handle({
    userKey,
    code,
  })

  return response.status(201).send()
}
