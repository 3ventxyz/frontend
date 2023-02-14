import { getDoc, doc } from '@firebase/firestore'
import { db } from './firebase_config'

export default async function CheckEventId(event_id: string) {
  if (event_id === '') {
    return false
  }
  const docRef = await doc(db, 'events', event_id)
  const docSnap = await getDoc(docRef)
  // const error ='event ID is already taken, please enter a different ID'
  console.trace(docSnap.exists())
  if (!docSnap.exists()) {
    console.trace('docRef is NULL. CREATING new event :)')
    return false
  } else {
    console.error('docRef Exists, please change your id')
    return true
  }
}
