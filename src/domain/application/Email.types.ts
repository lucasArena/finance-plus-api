export interface IEmailSendProps {
  to: string
  subject: string
  template: 'UserCodeVerification'
  variables?: Record<string, unknown>
}

export interface IEmail {
  send: (data: IEmailSendProps) => Promise<void>
}
