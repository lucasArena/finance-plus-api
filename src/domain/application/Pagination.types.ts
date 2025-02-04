// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PaginationNamespace {
  export interface IRequest {
    page: number
    pageSize: number
  }

  export interface IResponse<T> {
    page: number
    total: number
    totalPages: number
    items: T
  }
}
