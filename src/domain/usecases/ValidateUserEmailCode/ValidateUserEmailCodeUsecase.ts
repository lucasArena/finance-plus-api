import { inject, injectable } from 'tsyringe'

import {
  EUserCodeType,
  IUserCodesRepository,
} from '@/domain/ports/UserCodesRepository.types'
import { ValidateUserEmailCodeUsecaseDTO } from '@/domain/usecases/ValidateUserEmailCode/ValidateUserEmailCodeUsecaseDTO'
import { UserCode } from '@/domain/entities/UserCode.types'
import { IUserRepository } from '@/domain/ports/UserRepository.types'

@injectable()
export class ValidateUserCodeUsecase {
  constructor(
    @inject('IUserCodesRepository')
    private UserCodesRepository: IUserCodesRepository,
    @inject('IUserRepository')
    private userRepository: IUserRepository,
  ) {}

  async handle(data: ValidateUserEmailCodeUsecaseDTO) {
    if (!data.userKey)
      throw new Error('Chave do usuário requerida', { cause: 400 })

    const user = await this.userRepository.getByKey(data.userKey)

    if (!user) {
      throw new Error('Usuário não encontrado', { cause: 400 })
    }

    if (user.activatedAt) {
      throw new Error('Usuário já está ativado', { cause: 400 })
    }

    const userActivationCode = new UserCode({
      userKey: data.userKey,
      code: data.code,
      type: EUserCodeType.EMAIL_VALIDATION,
    })
    const activationCode =
      await this.UserCodesRepository.getByUserKeyAndTypeAndCode(
        userActivationCode,
      )

    if (!activationCode) {
      throw new Error('Codigo inválido', { cause: 400 })
    }

    if (activationCode.expiredAt && activationCode.expiredAt < new Date()) {
      throw new Error('Codigo expirado', { cause: 400 })
    }

    await this.userRepository.activateByKey(data.userKey)
    await this.UserCodesRepository.invalidateByTypeAndUserKey(
      userActivationCode,
    )
  }
}
