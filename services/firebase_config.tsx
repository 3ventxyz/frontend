import { initializeApp } from '@firebase/app'
import { getAnalytics, isSupported } from '@firebase/analytics'
import { connectFirestoreEmulator, getFirestore } from '@firebase/firestore'
import { connectAuthEmulator, getAuth } from '@firebase/auth'
import { getStorage, connectStorageEmulator } from '@firebase/storage'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null))
const storage = getStorage(app)
const functions = getFunctions(app)

export { analytics, app, auth, db, storage }

if (typeof window !== 'undefined') {
  if (window.location.hostname.includes('localhost')) {
    connectFunctionsEmulator(functions, 'localhost', 5001)
    connectAuthEmulator(auth, 'http://localhost:9099')
    connectFirestoreEmulator(db, 'localhost', 8080)
    connectStorageEmulator(storage, 'localhost',9199)
  }
}
