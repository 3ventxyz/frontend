
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


	console.log('registeringAttendeeForm submitted data===================')
    console.log('first_name: ', attendeeRegistrationData.first_name)
    console.log('last_name: ', attendeeRegistrationData.last_name)
    console.log('address: ', attendeeRegistrationData.address)
    console.log('state: ', attendeeRegistrationData.state)
    console.log('city: ', attendeeRegistrationData.city)
    console.log('phoneNumber: ', attendeeRegistrationData.phone_number)
    console.log('zip_code: ', attendeeRegistrationData.zip_code)
    console.log('uid:', attendeeRegistrationData.uid)
    console.log('eid:', eventId)
    console.log('===================')

	const eventDocRef = doc(db, 'events', eventId)
	const newAttendeeRegistrationRef = await setDoc(
		doc(collection(eventDocRef, 'registered_attendees'), attendeeRegistrationData.uid), attendeeRegistrationData
	)
	
}
