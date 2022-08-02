import { initializeApp } from '@firebase/app'
import { getAnalytics } from '@firebase/analytics'
import { getFirestore } from '@firebase/firestore/lite'
import { getAuth } from '@firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API_KEY_DEV,
  authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN_DEV,
  projectId: process.env.NEXT_FIREBASE_PROJECT_ID_DEV,
  storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET_DEV,
  messagingSenderId: process.env.NEXT_FIREBASE_MESSAGING_SENDER_ID_DEV,
  appId: process.env.NEXT_FIREBASE_APP_ID_DEV,
  measurementId: process.env.NEXT_FIREBASE_MEASUREMENT_ID_DEV
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const analytics = getAnalytics(app)
const auth = getAuth(app)

export { analytics, app, auth, db }
