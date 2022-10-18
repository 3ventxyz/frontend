import { collection, doc, setDoc } from "@firebase/firestore";
import { db } from "./firebase_config";


export default async function UpdateEventInfo(eventId:string, uid:string){

	// TODO: add the firebase function that updates the current info of the event
	//with the new event info.
	//this will update the current event doc with the passed data on the second argument.
	const userDocRef = doc(db, 'users', uid)
	
	//updating eventDoc from the events collection
	await setDoc(doc(db, 'events', eventId),{})
	
	//check if the user collection needs to be updated too.
	const createdEventDoc = doc(collection(userDocRef, 'created_events'), eventId);
	//end date, start date
}