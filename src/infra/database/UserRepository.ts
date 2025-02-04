import { IUser, User } from '@/domain/entities/User.types'
import { Knex } from '@/infra/database/DatabaseConfig'
import { IUserRepository } from '@/domain/ports/UserRepository.types'

export class UserRepository implements IUserRepository {
  constructor() {}

  async getByEmail(email: string): Promise<User | null> {
    const user = await Knex<IUser>('users')
      .where({
        email,
      })
      .first()

    if (!user) return null

    return new User({
      key: user.key,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }

  async getByEmailAndPassword(data: User): Promise<User | null> {
    const user = await Knex<IUser>('users')
      .where({
        email: data.email,
        password: data.password,
      })
      .first()

    if (!user) return null

    return new User({
      key: user.key,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }

  async create(data: User): Promise<void> {
    await Knex('users').insert({
      name: data.name,
      email: data.email,
      password: data.password,
    })
  }
}
