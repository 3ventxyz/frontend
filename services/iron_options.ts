export const ironOptions = {
  cookieName: 'siwe',
  password: process.env.NEXT_PUBLIC_IRON_PASSWORD as string,
  secure: process.env.NODE_ENV === 'production' ? true : false,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}
