import { inject, injectable } from 'tsyringe'

import { IUserActivationCodesRepository } from '@/domain/ports/UserActivactionCodesRepository.types'
import { IValidateUserCodeDTO } from '@/domain/usecases/ValidateUserCode/ValidateUserCodeDTO'

@injectable()
export class ValidateUserCode {
  constructor(
    @inject('IUserActivationCodesRepository')
    private userActivationCodes: IUserActivationCodesRepository,
  ) {}

  async handle(data: IValidateUserCodeDTO) {
    if (!data.userKey)
      throw new Error('Chave do usuário requerida', { cause: 400 })

    const activationCode = await this.userActivationCodes.getByUserKey(
      data.userKey,
    )

    if (!activationCode) {
      throw new Error('Codigo inválido', { cause: 400 })
    }

    if (activationCode.expiredAt && activationCode.expiredAt < new Date()) {
      throw new Error('Codigo expirado', { cause: 400 })
    }
  }
}
