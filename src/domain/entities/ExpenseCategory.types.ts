import { Entity, IEntity } from '@/domain/entities/Entity.types'

export interface IExpenseCategory extends IEntity {
  readonly name: string
}

export class ExpenseCategory extends Entity {
  public readonly name?: string

  constructor(props: Partial<IExpenseCategory>) {
    super({
      key: props.key,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    })

    this.name = props.name
  }
}
