import { UserActivationCode } from '@/domain/entities/UserActivationCode.types'
import { IEntity } from '@/domain/entities/Entity.types'

export interface IUserActivationCode extends IEntity {
  userKey: string
  code: number
  expiredAt?: Date
}

export interface IUserActivationCodesRepository {
  invalidateByUserKey: (userKey: string) => Promise<void>
  getByUserKey: (userKey: string) => Promise<UserActivationCode | null>
  create: (userActivationCode: UserActivationCode) => Promise<void>
}
