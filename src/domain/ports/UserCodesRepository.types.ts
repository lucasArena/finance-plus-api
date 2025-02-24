import { UserCode } from '@/domain/entities/UserCode.types'
import { IEntity } from '@/domain/entities/Entity.types'

export enum EUserCodeType {
  FORGET_PASSWORD = 'forget_password',
  EMAIL_VALIDATION = 'email_validation',
}

export interface IUserCode extends IEntity {
  userKey: string
  type: EUserCodeType
  code: number
  expiredAt?: Date
}

export interface IUserCodesRepository {
  invalidateByTypeAndUserKey: (data: UserCode) => Promise<void>
  getByUserKeyAndTypeAndCode: (
    userActivationCode: UserCode,
  ) => Promise<UserCode | null>
  create: (userActivationCode: UserCode) => Promise<void>
}
