import { Knex } from '@/infra/database/DatabaseConfig'

import {
  IUserCodesRepository,
  IUserCode,
} from '@/domain/ports/UserCodesRepository.types'
import { UserCode } from '@/domain/entities/UserCode.types'

export class UserCodesRepository implements IUserCodesRepository {
  async getByUserKeyAndTypeAndCode(data: UserCode): Promise<UserCode | null> {
    const userActivationCode = await Knex<IUserCode>('user_codes')
      .whereNull('deletedAt')
      .where({
        userKey: data.userKey,
        type: data.type,
        code: data.code,
      })
      .first<IUserCode>()

    if (!userActivationCode) {
      return null
    }

    return new UserCode({
      key: userActivationCode.key,
      userKey: userActivationCode.userKey,
      code: userActivationCode.code,
      expiredAt: new Date(userActivationCode.expiredAt || ''),
      createdAt: userActivationCode.createdAt,
      updatedAt: userActivationCode.updatedAt,
    })
  }

  async invalidateByTypeAndUserKey(data: UserCode): Promise<void> {
    await Knex<IUserCode>('user_codes')
      .update({ deletedAt: new Date() })
      .where({ userKey: data.userKey, type: data.type })
  }

  async create(userActivationCode: UserCode): Promise<void> {
    await Knex<IUserCode>('user_codes').insert<IUserCode>({
      userKey: userActivationCode.userKey,
      type: userActivationCode.type,
      code: userActivationCode.code,
      expiredAt: userActivationCode.expiredAt,
    })
  }
}
