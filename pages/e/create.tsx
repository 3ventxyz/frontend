// author: Marthel
import TextInput from '../../components/textInput'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import Button from '../../components/button'
import CreateTicketTier from './components/createTicketTier'
import FileImageInput from '../../components/fileImageInput'
import { useState } from 'react'
import Spinner from '../../components/spinner'
import LocationInput from '../../components/locationInput'
import { LocationData, TicketInterface } from '../../shared/interface/common'
import { createNewEvent } from '../../services/create_new_event'
import { useRouter } from 'next/router'
// import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle'

export default function CreateEvent() {
  const [isCreatingNewEvent, setIsCreatingNewEvent] = useState(false)
  const [title, setTitle] = useState<string | null>(null)
  const [organization, setOrganization] = useState<string | null>(null)
  const [eventDescription, setEventDescription] = useState<string | null>(null)
  const [eventLocation, setEventLocation] = useState<LocationData | null>(null)
  const [fileImg, setFileImg] = useState<File | null>(null)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  // tickets how is it going to be????
  const [ticketsData, setTicketsData] = useState<TicketInterface[] | null>()
  const router = useRouter()
  return (
    <div className="flex w-screen flex-col items-start space-y-[15px] bg-secondaryBg pb-[100px] pt-[35px] pl-[150px]">
      <h1>Create new event</h1>
      <div className="">
        <h4>Event Name:</h4>
        <TextInput
          id={''}
          labelText={''}
          placeholder={'e.g. crypto event 2023'}
          setValue={setTitle}
          isDisabled={isCreatingNewEvent}
        />
      </div>
      <div>
        <h4>Organization:</h4>
        <TextInput
          id={''}
          labelText={''}
          placeholder={'e.g. organization inc.'}
          setValue={setOrganization}
          isDisabled={isCreatingNewEvent}
        />
      </div>
      <div>
        <h4>Event Tile Picture:</h4>
        <FileImageInput fileImg={fileImg} setFileImg={setFileImg} />
      </div>
      <div>
        <h4>Details of the event</h4>
        <TextInput
          textArea={true}
          id={'event_description'}
          labelText={'Description of the event'}
          placeholder={'description ...'}
          setValue={setEventDescription}
          isDisabled={isCreatingNewEvent}
        />
        <LocationInput
          labelText={'Location'}
          id={'event_location'}
          placeholder={'123 name st, city, CA, 00000'}
          setLocation={setEventLocation}
        />
        <div>
          <h4>Start Date</h4>
          <input
            type="datetime-local"
            min="2018-06-07T00:00"
            max="2022-06-14T00:00"
            className="text-black"
            onChange={(e: any) => {
              setStartDate(new Date(e.target.value))
              console.log('date changed!!!')
              console.log(e.target.value)
              console.log(startDate)
              console.log('===============')
            }}
          ></input>
          <h4>End Date</h4>
          <input
            type="datetime-local"
            min="2018-06-07T00:00"
            max="2018-06-14T00:00"
            className="text-black"
            onChange={(e: any) => {
              setEndDate(new Date(e.target.value))
              console.log('date changed!!!')
              console.log(e.target.value)
              console.log(endDate)
              console.log('===============')
            }}
          ></input>
        </div>
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
            onClick={async () => {
              console.log('new event added')
              setIsCreatingNewEvent(true)
              await createNewEvent(
                {
                  title: title,
                  end_date: endDate,
                  start_date: startDate,
                  organization: organization,
                  uid: 'user id 123',
                  description: eventDescription,
                  location: eventLocation
                },
                fileImg
              )

              router.push('/e/eventCreated')
            }}
            active={true}
          />
        )}
      </div>
    </div>
  )
}
