import { collection, doc, getDocs } from '@firebase/firestore'
import { db } from './firebase_config'

export default async function FetchRegisteredAttendees(eid: string) {

  const eventRef = doc(db, 'events', eid)
  const registeredAttendeesCollectionRef = collection(
    eventRef,
    'registered_attendees'
  )

  const registeredAttendeesDocs = await getDocs(
    registeredAttendeesCollectionRef
  )

  return registeredAttendeesDocs
}
