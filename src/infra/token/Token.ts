import jwt from 'jsonwebtoken'

import { ENV } from '@/shared/utilities/EnvUtil'
import { IToken, ITokenDecoded } from '@/domain/application/Token.types'

export class Token implements IToken {
  constructor() {}

  public encrypt(payload: Record<string, unknown>) {
    return jwt.sign(payload, ENV.DECRYPT_KEY)
  }

  public verify(token: string) {
    return !!jwt.verify(token, ENV.DECRYPT_KEY)
  }

  public decrypt(token: string): ITokenDecoded | null {
    const decoded = jwt.decode(token, { json: true })

    if (!decoded) return null

    return decoded as ITokenDecoded
  }
}
