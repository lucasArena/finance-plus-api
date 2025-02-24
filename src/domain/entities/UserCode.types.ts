import { Entity, IEntity } from '@/domain/entities/Entity.types'
import { EUserCodeType } from '../ports/UserCodesRepository.types'

export interface IUserCode extends IEntity {
  readonly userKey: string
  readonly type: EUserCodeType
  readonly code: number
  readonly expiredAt: Date
}

export class UserCode extends Entity {
  public readonly userKey?: string
  public readonly type?: EUserCodeType
  public readonly code?: number
  public readonly expiredAt?: Date

  constructor(props: Partial<IUserCode>) {
    super({
      key: props.key,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    })

    this.userKey = props.userKey
    this.type = props.type
    this.code = props.code
    this.expiredAt = props.expiredAt
  }
}
