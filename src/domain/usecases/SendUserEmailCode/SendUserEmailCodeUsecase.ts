import { inject, injectable } from 'tsyringe'

import { IUserRepository } from '@/domain/ports/UserRepository.types'
import { IEmail } from '@/domain/application/Email.types'
import {
  EUserCodeType,
  IUserCodesRepository,
} from '@/domain/ports/UserCodesRepository.types'
import { UserCode } from '@/domain/entities/UserCode.types'
import { SendUserEmailCodeUsecaseDTO } from '@/domain/usecases/SendUserEmailCode/SendUserEmailCodeUsecaseDTO'

@injectable()
export class SendUserEmailCodeUsecase {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('IUserCodesRepository')
    private UserCodesRepository: IUserCodesRepository,
    @inject('IEmail') private email: IEmail,
  ) {}

  async handle(data: SendUserEmailCodeUsecaseDTO) {
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

    const userCode = new UserCode({
      userKey: user.key,
      type: EUserCodeType.EMAIL_VALIDATION,
      code: Math.floor(10000 + Math.random() * 90000),
    })

    await this.UserCodesRepository.invalidateByTypeAndUserKey(userCode)
    await this.UserCodesRepository.create(userCode)

    await this.email.send({
      to: user.email!,
      subject: 'Código de verificação',
      template: 'UserCodeVerification',
      variables: {
        code: userCode.code,
      },
    })
  }
}
