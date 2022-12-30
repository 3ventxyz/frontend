import { collection, doc, getDoc, setDoc } from '@firebase/firestore'
import { EventHostInterface } from '../shared/interface/common'
import { db } from './firebase_config'

export default async function updateCreatedEventToUser(
  // uid,
  // eventId,
  // startDate,
  // endDate,
  // eventTitle

  eventHost: EventHostInterface
  // uid: string
  // eventId: string
  // startDate: Date
  // endDate: Date
  // eventTitle: string
) {
  const userDocRef = doc(db, 'users', eventHost.uid)
  const docSnap = await getDoc(userDocRef)
  if (!docSnap.exists) {
    throw "error user doesn't exist. Contact customer support"
  }
  try {
    const newDocRef = await setDoc(
      doc(collection(userDocRef, 'created_events'), eventHost.event_id),
      {
        event_ref: doc(db, `/events/${eventHost.event_id}`),
        start_date: eventHost.start_date,
        end_date: eventHost.end_date,
        event_title: eventHost.title
      }
    )
  } catch (e) {
    throw e
  }
}
