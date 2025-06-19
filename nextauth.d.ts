import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      phoneNumber: string
      role: string
    } & DefaultSession['user']
  }
}
