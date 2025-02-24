import { inject, injectable } from 'tsyringe'

import {
  EUserCodeType,
  IUserCodesRepository,
} from '@/domain/ports/UserCodesRepository.types'
import { UserCode } from '@/domain/entities/UserCode.types'
import { IUserRepository } from '@/domain/ports/UserRepository.types'
import { ValidateUserCodeForgetPasswordUsecaseDTO } from '@/domain/usecases/ValidateUserCodeForgetPassword/ValidateUserCodeForgetPasswordUsecaseDTO'

@injectable()
export class ValidateUserCodeForgetPasswordUsecase {
  constructor(
    @inject('IUserCodesRepository')
    private UserCodesRepository: IUserCodesRepository,
    @inject('IUserRepository')
    private userRepository: IUserRepository,
  ) {}

  async handle(data: ValidateUserCodeForgetPasswordUsecaseDTO) {
    if (!data.email)
      throw new Error('Chave do usuário requerida', { cause: 400 })

    const user = await this.userRepository.getByEmail(data.email)

    if (!user) {
      throw new Error('Usuário não encontrado', { cause: 400 })
    }

    const userCode = new UserCode({
      userKey: user.key,
      code: data.code,
      type: EUserCodeType.FORGET_PASSWORD,
    })

    const code =
      await this.UserCodesRepository.getByUserKeyAndTypeAndCode(userCode)

    if (!code) {
      throw new Error('Codigo inválido', { cause: 400 })
    }

    if (code.expiredAt && code.expiredAt < new Date()) {
      throw new Error('Codigo expirado', { cause: 400 })
    }

    await this.UserCodesRepository.invalidateByTypeAndUserKey(userCode)
  }
}
