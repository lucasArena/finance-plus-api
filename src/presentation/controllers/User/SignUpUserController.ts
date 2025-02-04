import { SignUpUserUsecase } from '@/domain/usecases/SignUpUser/SignUpUserUsecase'
import { ISignUpUserUsecaseDTO } from '@/domain/usecases/SignUpUser/SignUpUserUsecaseDTO'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export const SignUpUserController = async (
  request: FastifyRequest<{ Body: ISignUpUserUsecaseDTO }>,
  response: FastifyReply,
) => {
  const { name, email, password } = request.body

  await container.resolve(SignUpUserUsecase).handle({
    name,
    email,
    password,
  })

  return response.status(201).send()
}
