import { SendActivationCodeEmailUsecase } from '@/domain/usecases/SendActivationCodeEmail/SendActivationCodeEmail'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export const SendActivationCodeEmailController = async (
  request: FastifyRequest<{
    Body: unknown
  }>,
  response: FastifyReply,
) => {
  const userKey = request.userKey

  await container.resolve(SendActivationCodeEmailUsecase).handle({
    userKey,
  })

  return response.status(201).send()
}
