import { db, storage } from './firebase_config'
import { EventInterface } from '../shared/interface/common'
import { doc, collection, setDoc, addDoc } from '@firebase/firestore'

export async function createNewEvent(newEventData: EventInterface | null) {
  try {
    if (!newEventData) {
      throw 'error event data is empty'
    }

    if (newEventData.event_id) {
      await setDoc(doc(db, 'events', newEventData?.event_id), newEventData)
    } else {
      const docRef = await addDoc(collection(db, 'events'), newEventData)
      return docRef.id
    }
  } catch (err) {
    console.log(err)
  }
}
