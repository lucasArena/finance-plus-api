import { Entity, IEntity } from '@/domain/entities/Entity.types'

export interface IUserActivationCode extends IEntity {
  readonly userKey: string
  readonly code: number
  readonly expiredAt: Date
}

export class UserActivationCode extends Entity {
  public readonly userKey?: string
  public readonly code?: number
  public readonly expiredAt?: Date

  constructor(props: Partial<IUserActivationCode>) {
    super({
      key: props.key,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    })

    this.userKey = props.userKey
    this.code = props.code
    this.expiredAt = props.expiredAt
  }
}
