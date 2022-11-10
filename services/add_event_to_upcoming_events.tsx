import { collection, doc, getDoc, setDoc } from '@firebase/firestore'
import { db } from './firebase_config'

export default async function addEventToUpcomingEvents({
  uid,
  eventId,
  startDate,
  endDate,
  eventTitle
}: {
  uid: string
  eventId: string
  startDate: Date
  endDate: Date
  eventTitle: string
}) {
  const userDocRef = doc(db, 'users', uid)
  const docSnap = await getDoc(userDocRef)
  if (!docSnap.exists) {
    throw "error user doesn't exist. Contact customer support"
  }
  try {
    const newDocRef = await setDoc(
      doc(collection(userDocRef, 'upcoming_events'), eventId),
      {
        event_ref: doc(db, `/events/${eventId}`),
        start_date: startDate,
        end_date: endDate,
        event_title: eventTitle
      }
    )
  } catch (e) {
    throw e
  }
}
