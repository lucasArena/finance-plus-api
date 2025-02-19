export interface IEmailSendProps {
  to: string
  subject: string
  template: 'Welcome'
  variables?: Record<string, unknown>
}

export interface IEmail {
  send: (data: IEmailSendProps) => Promise<void>
}
