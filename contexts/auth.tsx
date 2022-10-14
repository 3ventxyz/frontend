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
import { UserModel } from '../shared/interface/common'

interface Props {
  children?: ReactNode
}

interface UserCredentials {
  phoneNumber?: string
}

interface AuthInterface {
  currentUser?: User | null
  userModel?: UserModel | null
  setUserModel: (data: UserModel) => Promise<UserModel | null> | void
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
  isLoading: true,
  setUserModel: () => undefined
})

const AuthProvider = ({ children }: Props): JSX.Element => {
  const [uid, setUid] = useState('')
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userModel, setUserModel] = useState<UserModel | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    console.log('user model change', userModel)
  }, [userModel])

  // SENTINEL: WATCHES USER AUTH CHANGES + UPDATES STORE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      const loggedInUser = localStorage.getItem('3vent-user-model')
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser)
        setUserModel(foundUser)
      }
      setUid(user?.uid || '')
      setLoading(false)
      console.log('onAuthStateChanged(): current user', user, userModel)
    })
    return unsubscribe
  }, [])

  // UPDATE USER MODEL LOCAL STORAGE
  const updateUserModel = (userModel: UserModel) => {
    localStorage.setItem('3vent-user-model', JSON.stringify(userModel))
    setUserModel(userModel)
  }

  // LOGIN: UPDATE STORE + LOCALSTORAGE
  const login = ({ data }: any) => {
    setCurrentUser(data)
    setUid(data?.uid || '')
    localStorage.setItem('data', data)
  }

  // LOGOUT: UPDATE STORE + LOCALSTORAGE
  const logout = () => {
    setCurrentUser(null)
    setUserModel(null)
    setUid('')
    localStorage.clear()
    router.push('/')
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
        isLoading: loading,
        userModel: userModel,
        setUserModel: updateUserModel
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
