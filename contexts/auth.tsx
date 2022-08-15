import {
  signOut,
  onAuthStateChanged,
  User,
  UserCredential
} from '@firebase/auth'
import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect
} from 'react'
import { auth, db } from '../services/firebase_config'
import { useRouter } from 'next/router'

interface Props {
  children?: ReactNode
}

interface UserCredentials {
  phoneNumber?: string
}

interface AuthInterface {
  currentUser?: User | null
  uid: string
  login: ({ phoneNumber }: UserCredentials) => Promise<UserCredential> | void
  logout: () => Promise<void> | void
  isLoggedIn: () => boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthInterface>({
  uid: '',
  login: () => undefined,
  logout: () => undefined,
  isLoggedIn: () => false,
  isLoading: true
})

const AuthProvider = ({ children }: Props): JSX.Element => {
  const [uid, setUid] = useState('')
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // SENTINEL: SHOW THE CURRENT USER
  useEffect(() => {
    console.log('auth context: current user', currentUser)
  }, [currentUser])

  // SENTINEL: WATCHES USER AUTH CHANGES + UPDATES STORE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setUid(user?.uid || '')
      setLoading(false)
      console.log('onAuthStateChanged()', user)
    })
    return unsubscribe
  }, [])

  // LOGIN: UPDATE STORE + LOCALSTORAGE
  const login = ({ data }: any) => {
    setCurrentUser(data)
    setUid(data?.uid || '')
    localStorage.setItem('data', data)
  }

  // LOGOUT: UPDATE STORE + LOCALSTORAGE
  const logout = () => {
    setCurrentUser(null)
    setUid('')
    localStorage.setItem('data', '')
    router.push('/login')
    return signOut(auth)
  }

  // RETURNS AUTH STATE
  const isLoggedIn = () => {
    if (!currentUser) {
      return false
    }
    return true
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        uid: uid,
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn,
        isLoading: loading
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
