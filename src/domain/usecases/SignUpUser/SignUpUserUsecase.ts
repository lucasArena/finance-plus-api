import { inject, injectable } from 'tsyringe'

import { ISignUpUserUsecaseDTO } from '@/domain/usecases/SignUpUser/SignUpUserUsecaseDTO'
import { User } from '@/domain/entities/User.types'
import { IUserRepository } from '@/domain/ports/UserRepository.types'
import { IEmail } from '@/domain/application/Email.types'
import { IUserActivationCodesRepository } from '@/domain/ports/UserActivactionCodesRepository.types'
import { UserActivationCode } from '@/domain/entities/UserActivationCode.types'

@injectable()
export class SignUpUserUsecase {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('IUserActivationCodesRepository')
    private userActivationCodes: IUserActivationCodesRepository,
    @inject('IEmail') private email: IEmail,
  ) {}

  async handle(data: ISignUpUserUsecaseDTO) {
    if (!data.name) throw new Error('Name is required', { cause: 400 })
    if (!data.email) throw new Error('Email is required', { cause: 400 })
    if (!data.password) throw new Error('Password is required', { cause: 400 })

    const isEmailExists = await this.userRepository.getByEmail(data.email)

    if (isEmailExists) {
      throw new Error('Email já existente', { cause: 400 })
    }

    const user = new User({
      name: data.name,
      email: data.email,
      password: data.password,
    })

    const userKey = await this.userRepository.create(user)

    const userActivationCode = new UserActivationCode({
      userKey,
      code: Math.floor(10000 + Math.random() * 90000),
    })
    await this.userActivationCodes.create(userActivationCode)

    await this.email.send({
      to: data.email,
      subject: 'Bem vindo a BlueFin',
      template: 'Welcome',
      variables: {
        code: userActivationCode.code,
      },
    })
  }
}
