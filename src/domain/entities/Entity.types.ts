export interface IEntity {
  key: string
  createdAt: string
  updatedAt: string
  deletedAt: Date
}

export class Entity {
  public readonly key: string
  public readonly createdAt?: string
  public readonly updatedAt?: string
  public readonly deletedAt?: Date

  public constructor(props: Partial<IEntity>) {
    this.key = props.key || ''
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.deletedAt = props.deletedAt
  }
}
