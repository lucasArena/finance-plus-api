import { Entity, IEntity } from '@/domain/entities/Entity.types'
import { ExpenseCategory } from '@/domain/entities/ExpenseCategory.types'

export interface IExpense extends IEntity {
  userKey: string
  type: ExpenseCategory
  description?: string
  value: number
  date: string
}

export class Expense extends Entity {
  public readonly userKey?: string
  public readonly type?: ExpenseCategory
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
