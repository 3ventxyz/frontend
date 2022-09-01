import { NewEventInterface } from '../shared/interface/common'

export async function createNewEvent(newEventData: NewEventInterface | null) {
  try {
	if(!newEventData){
		throw('error event data is empty');
	}
  } catch (err) {
    console.log(err)
    return false
  }
  return true
}
