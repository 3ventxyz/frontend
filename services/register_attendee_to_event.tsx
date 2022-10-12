import { db } from './firebase_config'
import { collection, doc, setDoc } from '@firebase/firestore'
interface AttendeeRegistrationInterface {
  first_name: string
  last_name: string
  address: string
  state: string
  city: string
  phone_number: string
  zip_code: string
  uid: string
}

export default async function registerAttendeeToEvent(
  attendeeRegistrationData: AttendeeRegistrationInterface,
  eventId: string
) {
  const eventDocRef = doc(db, 'events', eventId)
  const userDocId = doc(db, 'users', attendeeRegistrationData.uid)

  await setDoc(
    doc(
      collection(eventDocRef, 'registered_attendees'),
      attendeeRegistrationData.uid
    ),
    attendeeRegistrationData
  )
  await setDoc(doc(collection(userDocId, 'registered_events'), eventId), {
    event_ref: doc(db, `/events/${eventId}`),
    start_date: new Date()
  })
}
