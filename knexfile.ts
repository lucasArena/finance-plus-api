import { Knex } from 'knex'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ...(process.env.ENVIRONMENT === 'production' && {
      ssl: { rejectUnauthorized: false },
    }),
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
    loadExtensions: ['.js', '.ts'],
  },
}

export default config
