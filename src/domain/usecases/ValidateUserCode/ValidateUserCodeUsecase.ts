import { inject, injectable } from 'tsyringe'

import { IUserActivationCodesRepository } from '@/domain/ports/UserActivactionCodesRepository.types'
import { IValidateUserCodeUsecaseDTO } from '@/domain/usecases/ValidateUserCode/ValidateUserCodeUsecaseDTO'
import { UserActivationCode } from '@/domain/entities/UserActivationCode.types'
import { IUserRepository } from '@/domain/ports/UserRepository.types'

@injectable()
export class ValidateUserCodeUsecase {
  constructor(
    @inject('IUserActivationCodesRepository')
    private userActivationCodesRepository: IUserActivationCodesRepository,
    @inject('IUserRepository')
    private userRepository: IUserRepository,
  ) {}

  async handle(data: IValidateUserCodeUsecaseDTO) {
    if (!data.userKey)
      throw new Error('Chave do usuário requerida', { cause: 400 })

    const user = await this.userRepository.getByKey(data.userKey)

    if (!user) {
      throw new Error('Usuário não encontrado', { cause: 400 })
    }

    if (user.activatedAt) {
      throw new Error('Usuário já está ativado', { cause: 400 })
    }

    const userActivationCode = new UserActivationCode({
      userKey: data.userKey,
      code: data.code,
    })
    const activationCode =
      await this.userActivationCodesRepository.getByUserKeyAndCode(
        userActivationCode,
      )

    if (!activationCode) {
      throw new Error('Codigo inválido', { cause: 400 })
    }

    if (activationCode.expiredAt && activationCode.expiredAt < new Date()) {
      throw new Error('Codigo expirado', { cause: 400 })
    }

    await this.userRepository.activateByUserKey(data.userKey)
    await this.userActivationCodesRepository.invalidateByUserKey(user.key)
  }
}
