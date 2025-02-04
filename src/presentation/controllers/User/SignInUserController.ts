import { SignInUserUsecase } from '@/domain/usecases/SignInUser/SignInUserUsecase'
import { ISignInUserUsecaseDTO } from '@/domain/usecases/SignInUser/SignInUserUsecaseDTO'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export const SignInUserController = async (
  request: FastifyRequest<{ Body: ISignInUserUsecaseDTO }>,
  response: FastifyReply,
) => {
  const { email, password } = request.body

  const token = await container.resolve(SignInUserUsecase).handle({
    email,
    password,
  })

  return response.status(200).send({
    token,
  })
}
