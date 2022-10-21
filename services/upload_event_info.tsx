// author:marthel.
import { db } from './firebase_config'
import { EventInterface } from '../shared/interface/common'
import { doc, collection, setDoc, addDoc } from '@firebase/firestore'

/**
 * upload event will upload the event info passed from the newEventData.
 * if an event doc already exists with the specified event-id, it will
 * update the info of that event document rather creating a new event.
 * otherwise, it will create a new event to our database, with the passed
 * event if
 */

export async function uploadEventInfo(newEventData: EventInterface | null) {
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
