import { Entity, IEntity } from '@/domain/entities/Entity.types'
import { ExpenseType } from '@/domain/entities/ExpenseType.types'

export interface IExpense extends IEntity {
  userKey: string
  type: ExpenseType
  description: string
  value: number
  date: string
}

export class Expense extends Entity {
  public readonly userKey?: string
  public readonly type?: ExpenseType
  public readonly description?: string
  public readonly value?: number
  public readonly date?: string

  constructor(props: Partial<IExpense>) {
    super({
      key: props.key,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    })

    this.type = props?.type
    this.description = props?.description
    this.value = props.value
    this.date = props.date
    this.userKey = props.userKey
  }
}
