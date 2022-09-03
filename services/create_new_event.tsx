import { db, storage } from './firebase_config'
import { NewEventInterface } from '../shared/interface/common'
import { addDoc, collection, setDoc } from '@firebase/firestore'

export async function createNewEvent(newEventData: NewEventInterface | null) {
  try {
    if (!newEventData) {
      throw 'error event data is empty'
    }

    console.log('====new event data to submit====')
    console.log('newEventData.eventTitle: ' + newEventData.eventTitle)
    console.log(
      'newEventData.eventDescription: ' + newEventData.eventDescription
    )
    console.log('newEventData.organization: ' + newEventData.organization)
    console.log('newEventData.date: ' + newEventData.date)
    console.log('------event location')
    console.log('newEventData.address: ' + newEventData.eventLocation?.address)
    console.log('newEventData.lat: ' + newEventData.eventLocation?.lat)
    console.log('newEventData.long: ' + newEventData.eventLocation?.long)
    console.log('--------------------')
    console.log('================================')

    //
    // const eventsRef = collection(db, 'events')

    const docRef = await addDoc(collection(db, 'events'), newEventData)

    console.log('firebase::create_new_event: NEW EVENT SUCCESSFULLY CREATED')
    console.log('docRef id: ' + docRef.id)
    console.log('===================')
  } catch (err) {
    console.log(err)
    return false
  }
  return true
}
