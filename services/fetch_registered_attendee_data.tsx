import { collection, doc, getDoc } from "@firebase/firestore"
import { db } from "./firebase_config"

export default async function fetchRegisteredAttendeeData(
	{uid, eid}:{uid:string, eid:string}
){
	const eventDocRef =  doc(db ,'events', eid)
	const uidDocRef = doc(collection(eventDocRef, 'registered_attendees'), uid)
	const docSnap = await getDoc(uidDocRef)
	return docSnap;
} 