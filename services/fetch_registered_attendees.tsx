import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query
} from '@firebase/firestore'
import { db } from './firebase_config'

const fetchRegisteredAttendeesCap = 10

export default async function FetchRegisteredAttendees(eid: string) {
  const eventRef = doc(db, 'events', eid)
  const registeredAttendeesCollectionRef = collection(
    eventRef,
    'registered_attendees'
  )

  const registeredAttendeesDocs = await getDocs(
    query(
      registeredAttendeesCollectionRef,
      orderBy('date_of_registration', 'desc'),
      limit(fetchRegisteredAttendeesCap)
    )
  )

  return registeredAttendeesDocs
}
