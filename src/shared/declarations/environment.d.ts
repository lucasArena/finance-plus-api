export interface IEnvironment {
  ENVIRONMENT: 'localhost' | 'production'
  PORT: number
  DB_HOST: string
  DB_USER: string
  DB_PASSWORD: string
  DB_NAME: string
  DB_PORT: number
  DECRYPT_KEY: string
  EMAIL_HOST: string
  EMAIL_USER: string
  EMAIL_PASSWORD: string
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly ENVIRONMENT: 'localhost' | 'production'
      readonly PORT: number
      readonly DB_HOST: string
      readonly DB_USER: string
      readonly DB_PASSWORD: string
      readonly DB_NAME: string
      readonly DB_PORT: string
      readonly DECRYPT_KEY: string
      readonly EMAIL_HOST: string
      readonly EMAIL_USER: string
      readonly EMAIL_PASSWORD: string
    }
  }
}

export {}
