
import { db } from "./firebase_config" 
import { collection, doc, setDoc } from "@firebase/firestore"

interface AttendeeRegistrationInterface {
  first_name: string
  last_name: string
  address: string
  state: string
  city: string
  phone_number: string
  zip_code: string
  uid:string
}

export default async function registerAttendeeToEvent(

  attendeeRegistrationData: AttendeeRegistrationInterface, eventId: string
) {
	const eventDocRef = doc(db, 'events', eventId)
	const newAttendeeRegistrationRef = await setDoc(
		doc(collection(eventDocRef, 'registered_attendees'), attendeeRegistrationData.uid), attendeeRegistrationData
	)
	
}
