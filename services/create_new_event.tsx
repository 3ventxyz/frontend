import { db, storage } from './firebase_config'
import { NewEventInterface } from '../shared/interface/common'
import { addDoc, collection, setDoc } from '@firebase/firestore'

export async function createNewEvent(
  newEventData: NewEventInterface | null,
  fileImg: File | null
) {
  console.log('newEventData.startDate: ' + newEventData?.start_date)
  console.log('newEventData.endDate: ' + newEventData?.end_date)
  try {
    if (!newEventData) {
      throw 'error event data is empty'
    }
    const docRef = await addDoc(collection(db, 'events'), newEventData)
    console.log('docRef id: ' + docRef.id)
    console.log('===================')
  } catch (err) {
    console.log(err)
    return false
  }
  return true
}
