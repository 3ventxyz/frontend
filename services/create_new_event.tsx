import { db, storage } from './firebase_config'
import { NewEventInterface } from '../shared/interface/common'
import { addDoc, collection, setDoc } from '@firebase/firestore'

export async function createNewEvent(
  newEventData: NewEventInterface | null,
  fileImg: File | null
) {
  try {
    if (!newEventData) {
      throw 'error event data is empty'
    }

    console.log('====new event data to submit====')
    console.log('newEventData.eventTitle: ' + newEventData.event_title)
    console.log(
      'newEventData.eventDescription: ' + newEventData.event_description
    )
    console.log('newEventData.organization: ' + newEventData.organization)
    console.log('newEventData.date: ' + newEventData.date_of_event)
    console.log('------event location')
    console.log('newEventData.address: ' + newEventData.event_location?.address)
    console.log('newEventData.lat: ' + newEventData.event_location?.lat)
    console.log('newEventData.long: ' + newEventData.event_location?.long)
    console.log('--------------------')

    console.log('**********file data**************')
    console.log(fileImg)
    console.log('*********************************')
    console.log('================================')
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
