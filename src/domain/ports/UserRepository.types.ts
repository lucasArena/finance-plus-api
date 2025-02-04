import { User } from '@/domain/entities/User.types'

export interface IUserRepository {
  getByEmail: (user: string) => Promise<User | null>
  getByEmailAndPassword: (user: User) => Promise<User | null>
  create: (user: User) => Promise<void>
}
