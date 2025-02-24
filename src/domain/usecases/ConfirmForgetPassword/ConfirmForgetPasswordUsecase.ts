import { inject, injectable } from 'tsyringe'

import { IUserRepository } from '@/domain/ports/UserRepository.types'
import { ConfirmForgetPasswordUsecaseDTO } from '@/domain/usecases/ConfirmForgetPassword/ConfirmForgetPasswordUsecaseDTO'
import { User } from '@/domain/entities/User.types'

@injectable()
export class ConfirmForgetPasswordUsecase {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository,
  ) {}

  async handle(data: ConfirmForgetPasswordUsecaseDTO) {
    if (!data.email) {
      throw new Error('Email é requirida', { cause: 401 })
    }

    if (!data.password) {
      throw new Error('Senha é requirida', { cause: 400 })
    }

    if (!data.passwordConfirmation) {
      throw new Error('Confirmação da senha é requirida', { cause: 400 })
    }

    if (data.password !== data.passwordConfirmation) {
      throw new Error('Senhas diferentes', { cause: 400 })
    }

    const user = await this.userRepository.getByEmail(data.email)

    if (!user) {
      throw new Error('Usuário não existe', { cause: 400 })
    }

    const userWithUpdatedPassword = new User({
      ...user,
      password: data.password,
    })
    await this.userRepository.updatePassword(userWithUpdatedPassword)
  }
}
