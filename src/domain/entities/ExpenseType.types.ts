import { Entity, IEntity } from '@/domain/entities/Entity.types'

export interface IExpenseType extends IEntity {
  readonly name: string
}

export class ExpenseType extends Entity {
  public readonly name?: string

  constructor(props: Partial<IExpenseType>) {
    super({
      key: props.key,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    })

    this.name = props.name
  }
}
