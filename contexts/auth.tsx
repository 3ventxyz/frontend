import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup
} from '@firebase/auth'

import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect
} from 'react'

import { auth } from '../services/firebase_config'

interface Props {
  children?: ReactNode
}

interface UserCredentials {
  email?: string
  password?: string
}

interface AuthInterface {
  currentUser?: User | null
  signInWithGoogle: () => Promise<UserCredential> | void
  register: ({
    email,
    password
  }: UserCredentials) => Promise<UserCredential> | void
  login: ({
    email,
    password
  }: UserCredentials) => Promise<UserCredential> | void
  logout: () => Promise<void> | void
}

const AuthContext = createContext<AuthInterface>({
  register: () => undefined,
  login: () => undefined,
  logout: () => undefined,
  signInWithGoogle: () => undefined
})

const AuthProvider = ({ children }: Props): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })

  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider)
  }

  const register = ({
    email: email = '',
    password: password = ''
  }: UserCredentials) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = ({
    email: email = '',
    password: password = ''
  }: UserCredentials) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
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
        signInWithGoogle: signInWithGoogle,
        register: register,
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
