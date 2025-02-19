import { inject, injectable } from 'tsyringe'

import { IUserRepository } from '@/domain/ports/UserRepository.types'
import { IEmail } from '@/domain/application/Email.types'
import { IUserActivationCodesRepository } from '@/domain/ports/UserActivactionCodesRepository.types'
import { UserActivationCode } from '@/domain/entities/UserActivationCode.types'
import { SendActivationCodeEmailDTO } from '@/domain/usecases/SendActivationCodeEmail/SendActivationCodeEmailDTO'

@injectable()
export class SendActivationCodeEmailUsecase {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('IUserActivationCodesRepository')
    private userActivationCodesRepository: IUserActivationCodesRepository,
    @inject('IEmail') private email: IEmail,
  ) {}

  async handle(data: SendActivationCodeEmailDTO) {
    if (!data.userKey) {
      throw new Error('Chave do usuário é requirida', { cause: 401 })
    }

    const user = await this.userRepository.getByKey(data.userKey)

    if (!user) {
      throw new Error('Usuário não existe', { cause: 400 })
    }

    if (user.activatedAt) {
      throw new Error('Usuário já está ativado', { cause: 400 })
    }

    await this.userActivationCodesRepository.invalidateByUserKey(user.key)

    const userActivationCode = new UserActivationCode({
      userKey: user.key,
      code: Math.floor(10000 + Math.random() * 90000),
    })
    await this.userActivationCodesRepository.create(userActivationCode)

    await this.email.send({
      to: user.email!,
      subject: 'Bem vindo a BlueFin',
      template: 'Welcome',
      variables: {
        code: userActivationCode.code,
      },
    })
  }
}
