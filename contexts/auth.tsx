import {
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  signInWithPhoneNumber
} from '@firebase/auth'
import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect
} from 'react'
import { auth, db } from '../services/firebase_config'
import { doc, setDoc, getDoc } from '@firebase/firestore'

interface Props {
  children?: ReactNode
}

interface UserCredentials {
  phoneNumber?: string
}

interface AuthInterface {
  currentUser?: User | null
  login: ({ phoneNumber }: UserCredentials) => Promise<UserCredential> | void
  logout: () => Promise<void> | void
}

const AuthContext = createContext<AuthInterface>({
  login: () => undefined,
  logout: () => undefined
})

const AuthProvider = ({ children }: Props): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const logout = () => {
    return signOut(auth)
  }

  useEffect(() => {
    console.log('current user', currentUser)
  }, [currentUser])

  const login = ({ phoneNumber: phoneNumber = '' }: UserCredentials) => {
    // setCurrentUser()
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        login: login,
        logout: logout
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
