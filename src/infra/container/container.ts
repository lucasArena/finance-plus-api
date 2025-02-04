import { container } from 'tsyringe'
import { IUserRepository } from '@/domain/ports/UserRepository.types'
import { UserRepository } from '@/infra/database/UserRepository'
import { Token } from '@/infra/token/Token'
import { IToken } from '@/domain/application/Token.types'
import { IExpenseTypeRepository } from '@/domain/ports/ExpenseTypeRepository.types'
import { ExpenseTypeRepository } from '@/infra/database/ExpenseTypeRepository'
import { ExpenseRepository } from '@/infra/database/ExpenseRepository'
import { IExpenseRepository } from '@/domain/ports/ExpenseRepository.types'

container.register<IToken>('IToken', {
  useClass: Token,
})

container.register<IUserRepository>('IUserRepository', {
  useClass: UserRepository,
})
container.register<IExpenseTypeRepository>('IExpenseTypeRepository', {
  useClass: ExpenseTypeRepository,
})
container.register<IExpenseRepository>('IExpenseRepository', {
  useClass: ExpenseRepository,
})
