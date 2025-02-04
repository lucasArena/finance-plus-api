import { PaginationNamespace } from '@/domain/application/Pagination.types'

export interface IListUserExpensesDTO extends PaginationNamespace.IRequest {
  userKey?: string
  month: number
  year: number
}
