import { Knex } from '@/infra/database/DatabaseConfig'

import {
  IUserCodesRepository,
  IUserCode,
} from '@/domain/ports/UserCodesRepository.types'
import { UserCode } from '@/domain/entities/UserCode.types'

export class UserCodesRepository implements IUserCodesRepository {
  async getByUserKeyAndTypeAndCode(data: UserCode): Promise<UserCode | null> {
    const userCode = await Knex<IUserCode>('user_codes')
      .whereNull('deletedAt')
      .where({
        userKey: data.userKey,
        type: data.type,
        code: data.code,
      })
      .first<IUserCode>()

    if (!userCode) {
      return null
    }

    return new UserCode({
      key: userCode.key,
      userKey: userCode.userKey,
      code: userCode.code,
      type: userCode.type,
      expiredAt: new Date(userCode.expiredAt || ''),
      createdAt: userCode.createdAt,
      updatedAt: userCode.updatedAt,
    })
  }

  async invalidateByTypeAndUserKey(data: UserCode): Promise<void> {
    await Knex<IUserCode>('user_codes')
      .update({ deletedAt: new Date() })
      .where({ userKey: data.userKey, type: data.type })
  }

  async create(userCode: UserCode): Promise<void> {
    await Knex<IUserCode>('user_codes').insert<IUserCode>({
      userKey: userCode.userKey,
      type: userCode.type,
      code: userCode.code,
      expiredAt: userCode.expiredAt,
    })
  }
}
