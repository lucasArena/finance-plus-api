import { SendActivationCodeEmailUsecase } from '@/domain/usecases/SendActivationCodeEmail/SendActivationCodeEmail'
import { SendActivationCodeEmailDTO } from '@/domain/usecases/SendActivationCodeEmail/SendActivationCodeEmailDTO'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export const SendActivationCodeEmailController = async (
  request: FastifyRequest<{
    Body: SendActivationCodeEmailDTO
  }>,
  response: FastifyReply,
) => {
  const { userKey } = request.body

  await container.resolve(SendActivationCodeEmailUsecase).handle({
    userKey,
  })

  return response.status(201).send()
}
