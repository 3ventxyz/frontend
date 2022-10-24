import { db } from './firebase_config'
import {
  collection,
  doc,
  getDoc,
  setDoc,
  DocumentData,
  updateDoc
} from '@firebase/firestore'
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

  //registering the user, to the event document.
  const eventDoc: DocumentData = await getDoc(eventDocRef)
  console.log(eventDoc)
  let registered_attendees_counter =
    eventDoc.data().counted_registered_attendees
  await updateDoc(eventDocRef, {
    counted_registered_attendees: registered_attendees_counter + 1
  })
  await setDoc(
    doc(
      collection(eventDocRef, 'registered_attendees'),
      attendeeRegistrationData.uid
    ),
    attendeeRegistrationData
  )
  //registering the event, to the user document.
  await setDoc(doc(collection(userDocId, 'registered_events'), eventId), {
    event_ref: doc(db, `/events/${eventId}`),
    start_date: new Date()
  })
}
