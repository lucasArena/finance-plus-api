import { ENV } from '@/shared/utilities/EnvUtil'
import knex from 'knex'

const Knex = knex({
  client: 'postgres',
  connection: {
    host: ENV.DB_HOST,
    user: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME,
    port: ENV.DB_PORT,
    ...(ENV.ENVIRONMENT === 'production' && {
      ssl: { rejectUnauthorized: false },
    }),
  },
})
export { Knex }
