import { inject, injectable } from 'tsyringe'

import { ISignUpUserUsecaseDTO } from '@/domain/usecases/SignUpUser/SignUpUserUsecaseDTO'
import { User } from '@/domain/entities/User.types'
import { IUserRepository } from '@/domain/ports/UserRepository.types'

@injectable()
export class SignUpUserUsecase {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository,
  ) {}

  async handle(data: ISignUpUserUsecaseDTO) {
    if (!data.name) throw new Error('Name is required', { cause: 400 })
    if (!data.email) throw new Error('Email is required', { cause: 400 })
    if (!data.password) throw new Error('Password is required', { cause: 400 })

    const isEmailExists = await this.userRepository.getByEmail(data.email)

    if (isEmailExists) {
      throw new Error('Email already exists', { cause: 400 })
    }

    const user = new User({
      name: data.name,
      email: data.email,
      password: data.password,
    })

    await this.userRepository.create(user)
  }
}
