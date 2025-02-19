import { Knex } from '@/infra/database/DatabaseConfig'

import {
  IUserActivationCodesRepository,
  IUserActivationCode,
} from '@/domain/ports/UserActivactionCodesRepository.types'
import { UserActivationCode } from '@/domain/entities/UserActivationCode.types'

export class UserActivationCodesRepository
  implements IUserActivationCodesRepository
{
  async getByUserKeyAndCode(
    data: UserActivationCode,
  ): Promise<UserActivationCode | null> {
    const userActivationCode = await Knex<IUserActivationCode>(
      'user_activation_codes',
    )
      .whereNull('deletedAt')
      .where({
        userKey: data.userKey,
        code: data.code,
      })
      .first<IUserActivationCode>()

    if (!userActivationCode) {
      return null
    }

    return new UserActivationCode({
      key: userActivationCode.key,
      userKey: userActivationCode.userKey,
      code: userActivationCode.code,
      expiredAt: new Date(userActivationCode.expiredAt || ''),
      createdAt: userActivationCode.createdAt,
      updatedAt: userActivationCode.updatedAt,
    })
  }

  async invalidateByUserKey(userKey: string): Promise<void> {
    await Knex<IUserActivationCode>('user_activation_codes')
      .update({ deletedAt: new Date() })
      .where({ userKey })
  }

  async create(userActivationCode: UserActivationCode): Promise<void> {
    await Knex<IUserActivationCode>(
      'user_activation_codes',
    ).insert<IUserActivationCode>({
      userKey: userActivationCode.userKey,
      code: userActivationCode.code,
      expiredAt: userActivationCode.expiredAt,
    })
  }
}
