import { SendUserEmailCodeUsecase } from '@/domain/usecases/SendUserEmailCode/SendUserEmailCodeUsecase'
import { SendUserEmailCodeUsecaseDTO } from '@/domain/usecases/SendUserEmailCode/SendUserEmailCodeUsecaseDTO'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export const SendUserEmailCodeController = async (
  request: FastifyRequest<{
    Body: SendUserEmailCodeUsecaseDTO
  }>,
  response: FastifyReply,
) => {
  const { userKey } = request.body

  await container.resolve(SendUserEmailCodeUsecase).handle({
    userKey,
  })

  return response.status(204).send()
}
