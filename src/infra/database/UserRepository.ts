import { IUser, User } from '@/domain/entities/User.types'
import { Knex } from '@/infra/database/DatabaseConfig'
import { IUserRepository } from '@/domain/ports/UserRepository.types'

export class UserRepository implements IUserRepository {
  constructor() {}

  async getByKey(key: string): Promise<User | null> {
    const user = await Knex<IUser>('users')
      .where({
        key,
      })
      .whereNull('deletedAt')
      .first()

    if (!user) return null

    return new User({
      key: user.key,
      name: user.name,
      email: user.email,
      password: user.password,
      activatedAt: user.activatedAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await Knex<IUser>('users')
      .where({
        email,
      })
      .whereNull('deletedAt')
      .first()

    if (!user) return null

    return new User({
      key: user.key,
      name: user.name,
      email: user.email,
      password: user.password,
      activatedAt: user.activatedAt,
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
      .whereNull('deletedAt')
      .first()

    if (!user) return null

    return new User({
      key: user.key,
      name: user.name,
      email: user.email,
      activatedAt: user.activatedAt,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }

  async create(data: User): Promise<string> {
    const [user] = await Knex('users')
      .insert({
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .returning<Pick<IUser, 'key'>[]>(['key'])

    return user.key
  }

  async activateByKey(key: string): Promise<void> {
    await Knex('users')
      .update({
        activatedAt: new Date(),
      })
      .where({ key })
  }
}
