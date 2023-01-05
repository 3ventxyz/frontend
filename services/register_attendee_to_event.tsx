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
  address: string
  phone_number: string
  uid: string
  date_of_registration: Date
  avatar: string
  username: string
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
  let registered_attendees: number = eventDoc.data().registered_attendees
  await updateDoc(eventDocRef, {
    registered_attendees: registered_attendees + 1
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
