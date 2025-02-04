export interface ITokenDecoded {
  key: string
}

export interface IToken {
  encrypt: (payload: Record<string, unknown>) => string
  verify: (token: string) => boolean
  decrypt: (token: string) => ITokenDecoded | null
}
