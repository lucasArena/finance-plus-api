import { inject, injectable } from 'tsyringe'

import { User } from '@/domain/entities/User.types'
import { IUserRepository } from '@/domain/ports/UserRepository.types'
import { ISignInUserUsecaseDTO } from '@/domain/usecases/SignInUser/SignInUserUsecaseDTO'
import { IToken } from '@/domain/application/Token.types'

@injectable()
export class SignInUserUsecase {
  constructor(
    @inject('IToken') private authentication: IToken,
    @inject('IUserRepository') private userRepository: IUserRepository,
  ) {}

  async handle(data: ISignInUserUsecaseDTO) {
    if (!data.email) throw new Error('Email é obrigatório', { cause: 400 })
    if (!data.password) throw new Error('Senha é obrigatório', { cause: 400 })

    const user = new User({ email: data.email, password: data.password })

    const usersignIn = await this.userRepository.getByEmailAndPassword(user)

    if (!usersignIn) {
      throw new Error('Email ou senha incorretos', { cause: 401 })
    }

    return this.authentication.encrypt({
      key: usersignIn.key,
      name: usersignIn.name,
      activatedAt: usersignIn.activatedAt,
    })
  }
}
