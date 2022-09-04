import 'iron-session'
import { CookieSerializeOptions } from 'next/dist/server/web/types'
import { SiweMessage } from 'siwe'

declare module 'iron-session' {
  interface IronSessionData {
    nonce?: string
    siwe?: SiweMessage
    cookie: CookieSerializeOptions
  }
}
