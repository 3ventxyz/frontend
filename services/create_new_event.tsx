import { db, storage } from './firebase_config'
import { NewEventInterface } from '../shared/interface/common'
import { addDoc, collection, setDoc } from '@firebase/firestore'

export async function createNewEvent(
  newEventData: NewEventInterface | null,
  fileImg: File | null
) {
  try {
    if (!newEventData) {
      throw 'error event data is empty'
    }
    const docRef = await addDoc(collection(db, 'events'), newEventData)
  } catch (err) {
    console.log(err)
    return false
  }
  return true
}
