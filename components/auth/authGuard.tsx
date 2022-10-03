import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../../contexts/auth'

export function AuthGuard({ children }: { children: JSX.Element }) {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    //auth is initialized and there is no user
    if (!auth.currentUser) {
      // redirect
      router.push('/login')
    }
  }, [auth.currentUser, router])

  // if auth initialized with a valid user show protected page
  if (auth.currentUser) {
    return <>{children}</>
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null
}
