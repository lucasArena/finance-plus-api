import { container } from 'tsyringe'
import { IUserRepository } from '@/domain/ports/UserRepository.types'
import { UserRepository } from '@/infra/database/UserRepository'
import { Token } from '@/infra/token/Token'
import { IToken } from '@/domain/application/Token.types'
import { IExpenseCategoryRepository } from '@/domain/ports/ExpenseCategoryRepository.types'
import { ExpenseCategoryRepository } from '@/infra/database/ExpenseCategoryRepository'
import { ExpenseRepository } from '@/infra/database/ExpenseRepository'
import { IExpenseRepository } from '@/domain/ports/ExpenseRepository.types'
import { IEmail } from '@/domain/application/Email.types'
import { NodeMailerEmail } from '@/infra/email/NodeMailerEmail'
import { UserCodesRepository } from '@/infra/database/UserCodesRepository'
import { IUserCodesRepository } from '@/domain/ports/UserCodesRepository.types'

container.register<IToken>('IToken', {
  useClass: Token,
})

container.register<IUserRepository>('IUserRepository', {
  useClass: UserRepository,
})
container.register<IExpenseCategoryRepository>('IExpenseCategoryRepository', {
  useClass: ExpenseCategoryRepository,
})
container.register<IExpenseRepository>('IExpenseRepository', {
  useClass: ExpenseRepository,
})

container.register<IUserCodesRepository>('IUserCodesRepository', {
  useClass: UserCodesRepository,
})

container.register<IEmail>('IEmail', {
  useClass: NodeMailerEmail,
})
