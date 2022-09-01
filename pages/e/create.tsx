import TextInput from '../../components/textInput'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import Button from '../../components/button'
import CreateTicketTier from './components/createTicketTier'
import FileImageInput from '../../components/fileImageInput'
import { useState } from 'react'
import Spinner from '../../components/spinner'
import LocationInput from '../../components/locationInput'
import { NewEventInterface } from '../../shared/interface/common'
import { createNewEvent } from '../../services/create_new_event'
export default function CreateEvent() {
  const [isCreatingNewEvent, setIsCreatingNewEvent] = useState(false)
  const [eventTitle, setEventTitle] = useState<String | null>(null)
  const [organization, setOrganization] = useState<String | null>(null)
  const [eventDescription, setEventDescription] = useState<String | null>(null)
  const [eventLocation, setEventLocation] = useState<String | null>()
  const [fileImg, setFileImg] = useState()
  const [eventDate, setEventDate] = useState<String | null>(null)
  const [newEventData, setNewEventData] = useState<NewEventInterface | null>(
    null
  )

  // tickets how is it going to be????
  return (
    <div className="flex w-screen flex-col items-start space-y-[15px] bg-secondaryBg pb-[100px] pt-[35px] pl-[150px]">
      <h1>Create new event</h1>
      <div className="">
        <h4>Event Name:</h4>
        <TextInput
          id={''}
          labelText={''}
          placeholder={'e.g. crypto event 2023'}
          setValue={(e: any) => {
            console.log('event name: ' + e)
          }}
          isDisabled={isCreatingNewEvent}
        />
      </div>
      <div>
        <h4>Organization:</h4>
        <TextInput
          id={''}
          labelText={''}
          placeholder={'e.g. organization inc.'}
          setValue={(e: any) => {
            console.log('event name: ' + e)
          }}
          isDisabled={isCreatingNewEvent}
        />
      </div>
      <div>
        <h4>Event Tile Picture:</h4>
        <FileImageInput />
      </div>
      <div>
        <h4>Details of the event</h4>
        {/* <LocationInput
            labelText={'Location'}
            id={'event_location'}
            placeholder={'123 name st, city, CA, 00000'}
            setLocation={() => {
              // console.log('===============setting location===============')
              // console.log(e)
              // console.log('==============================================')
            }}
          /> */}
        <TextInput
          textArea={true}
          id={'event_description'}
          labelText={'Description of the event'}
          placeholder={'description ...'}
          setValue={(e: any) => {
            console.log('event name: ' + e)
          }}
          isDisabled={isCreatingNewEvent}
        />
        <TextInput
          id={'location'}
          labelText={'Address or location of the event'}
          placeholder={'123 name st, city, CA, 00000'}
          setValue={(e: any) => {
            console.log('event name: ' + e)
          }}
          isDisabled={isCreatingNewEvent}
        />
        <TextInput
          id={'date'}
          labelText={'date of the event'}
          placeholder={'mm/dd/yyyy'}
          setValue={(e: any) => {
            console.log('event name: ' + e)
          }}
          isDisabled={isCreatingNewEvent}
        />
      </div>
      <div>
        <div className="flex  items-baseline space-x-[10px]">
          <h4>Tickets</h4>
          <p>(You can create up to 4 ticket tiers)</p>
        </div>
        <CreateTicketTier creatingNewEvent={isCreatingNewEvent} />
      </div>
      <div>
        {isCreatingNewEvent ? (
          <div className="flex items-center space-x-[10px]">
            <Spinner width={40} height={40} />
            <p>Creating new event, please do not refresh</p>
          </div>
        ) : (
          <Button
            type="submit"
            text={'Create new event'}
            onClick={() => {
              console.log('new event added')
              setIsCreatingNewEvent(true)
              setNewEventData({
                address: eventLocation,
                date: eventDate,
                eventTitle: eventTitle,
                organization: organization,
                uid: '',
                eventDescription: eventDescription
              } && null)
              createNewEvent(newEventData)
            }}
            active={true}
          />
        )}
      </div>
    </div>
  )
}
