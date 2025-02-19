import { UserActivationCode } from '@/domain/entities/UserActivationCode.types'
import { IEntity } from '@/domain/entities/Entity.types'

export interface IUserActivationCode extends IEntity {
  userKey: string
  code: number
  expiredAt?: Date
}

export interface IUserActivationCodesRepository {
  invalidateByUserKey: (userKey: string) => Promise<void>
  getByUserKeyAndCode: (
    userActivationCode: UserActivationCode,
  ) => Promise<UserActivationCode | null>
  create: (userActivationCode: UserActivationCode) => Promise<void>
}
