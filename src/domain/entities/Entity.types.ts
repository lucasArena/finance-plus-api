export interface IEntity {
  key: string
  createdAt: string
  updatedAt: string
}

export class Entity {
  public readonly key: string
  public readonly createdAt?: string
  public readonly updatedAt?: string

  public constructor(props: Partial<IEntity>) {
    this.key = props.key || ''
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }
}
