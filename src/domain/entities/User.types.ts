import { Entity, IEntity } from '@/domain/entities/Entity.types'

export interface IUser extends IEntity {
  name: string
  email: string
  password: string
}

export class User extends Entity {
  public readonly name?: string
  public readonly email?: string
  public readonly password?: string

  constructor(props: Partial<IUser>) {
    super({
      key: props.key,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    })

    this.email = props.email
    this.password = props.password
  }
}
