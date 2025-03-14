import { inject, injectable } from 'tsyringe'

import { IUserRepository } from '@/domain/ports/UserRepository.types'
import { IEmail } from '@/domain/application/Email.types'
import {
  EUserCodeType,
  IUserCodesRepository,
} from '@/domain/ports/UserCodesRepository.types'
import { UserCode } from '@/domain/entities/UserCode.types'
import { SendUserForgetPasswordCodeDTO } from '@/domain/usecases/SendUserForgetPasswordCode/SendUserForgetPasswordCodeUsecaseDTO'

@injectable()
export class SendUserForgetPasswordCodeUsecase {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('IUserCodesRepository')
    private UserCodesRepository: IUserCodesRepository,
    @inject('IEmail') private email: IEmail,
  ) {}

  async handle(data: SendUserForgetPasswordCodeDTO) {
    if (!data.email) {
      throw new Error('Email é requerido', { cause: 400 })
    }

    const user = await this.userRepository.getByEmail(data.email)

    if (!user) {
      throw new Error('Usuário não existe', { cause: 400 })
    }

    const userCode = new UserCode({
      userKey: user.key,
      type: EUserCodeType.FORGET_PASSWORD,
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
