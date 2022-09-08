// author: Marthel
import TextInput from '../../components/textInput'
import Button from '../../components/button'
import FileImageInput from '../../components/fileImageInput'
import { useState } from 'react'
import Spinner from '../../components/spinner'
import LocationInput from '../../components/locationInput'
import { LocationData, TimeStamp } from '../../shared/interface/common'
import { createNewEvent } from '../../services/create_new_event'
import { useRouter } from 'next/router'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { storage } from '../../services/firebase_config'
import { useAuth } from '../../contexts/auth'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { uploadImage } from '../../services/upload_image'

export default function CreateEvent() {
  const [isCreatingNewEvent, setIsCreatingNewEvent] = useState(false)
  const [title, setTitle] = useState<string>('')
  const [organization, setOrganization] = useState<string>('')
  const [eventId, setEventId] = useState<string>('')
  const [eventDescription, setEventDescription] = useState<string>('')
  const [eventLocation, setEventLocation] = useState<LocationData>({
    address: '',
    lat: 0,
    long: 0
  })
  const [fileImg, setFileImg] = useState<File | null>(null)
  const [ticketMax, setTicketMax] = useState<number>(0)
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  const router = useRouter()
  const auth = useAuth()

  const createEvent = async () => {
    setIsCreatingNewEvent(true)
    const path = `${auth.uid}/${fileImg?.name}`
    await uploadImage(fileImg, path, async (url: string) => {
      const returnedId = await createNewEvent({
        title: title,
        end_date: endDate,
        start_date: startDate,
        organization: '',
        uid: auth.uid,
        description: eventDescription,
        location: eventLocation,
        img_url: url,
        ticket_max: ticketMax,
        event_id: eventId
      })
      console.log('returned id', returnedId)
      router.push(`/e/${returnedId}`)
    })
  }

  return (
    <div className="flex w-screen bg-secondaryBg pb-[100px] pt-[35px]">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-start justify-start space-y-4">
        <h3 className="w-full text-center">Create an Event</h3>
        <TextInput
          id={'event_name'}
          labelText={'Event Title'}
          placeholder={''}
          setValue={setTitle}
          isDisabled={isCreatingNewEvent}
        />
        <TextInput
          id={'event_id'}
          labelText={'Event ID:'}
          placeholder={'www.3vent.xyz/e/'}
          setValue={setEventId}
          isDisabled={isCreatingNewEvent}
        />
        <TextInput
          textArea={true}
          id={'event_description'}
          labelText={'Description'}
          placeholder={''}
          setValue={setEventDescription}
          isDisabled={isCreatingNewEvent}
        />
        <LocationInput
          labelText={'Location'}
          id={'event_location'}
          placeholder={''}
          setLocation={setEventLocation}
        />
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
          <p>Start Date</p>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>

        <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
          <p>End Date</p>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
          <p>Event Image:</p>
          <FileImageInput fileImg={fileImg} setFileImg={setFileImg} />
        </div>
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
          <p>Tickets:</p>
          <input
            onChange={(e) => {
              setTicketMax(parseInt(e.target.value))
            }}
            className={`focus:shadow-outline leading-0 h-full min-h-[56px] w-full max-w-[400px] rounded-[16px] border-[1.5px] ${
              isCreatingNewEvent
                ? 'border-gray-300  text-gray-300'
                : 'border-black  text-gray-700'
            } px-2  focus:outline-none`}
            id={'event_ticket_max'}
            type="number"
            placeholder={'0'}
            disabled={isCreatingNewEvent}
          />
        </div>
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
          {isCreatingNewEvent ? (
            <>
              <Spinner width={40} height={40} />
              <p>Creating new event, please do not refresh</p>
            </>
          ) : (
            <Button
              type="submit"
              text={'Create new event'}
              onClick={() => createEvent()}
              active={true}
            />
          )}
        </div>
      </div>
    </div>
  )
}
