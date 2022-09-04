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
import FileInput from '../../components/fileInput'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { storage } from '../../services/firebase_config'
import { useAuth } from '../../contexts/auth'

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
  const auth = useAuth()

  const createEvent = async () => {
    if (!fileImg) {
      alert('Please upload an image first!')
    }
    const storageRef = ref(storage, `/files/${auth.uid}/${fileImg?.name}`)
    const fileBuffer = await fileImg?.arrayBuffer()
    if (fileBuffer) {
      const uploadTask = uploadBytesResumable(storageRef, fileBuffer)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
        },
        (err) => {
          return ''
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            console.log('rendered url', url)
            setIsCreatingNewEvent(true)
            const eventId = await createNewEvent({
              title: title,
              end_date: endDate,
              start_date: startDate,
              organization: organization,
              uid: auth.uid,
              description: eventDescription,
              location: eventLocation,
              img_url: url
            })
            router.push(`/e/${eventId}`)
            return url
          })
        }
      )
    }
    return ''
  }

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
            min="2022-09-01T00:00"
            max="2023-06-14T00:00"
            className="text-black"
            onChange={(e: any) => {
              setStartDate(new Date(e.target.value))
            }}
          ></input>
          <h4>End Date</h4>
          <input
            type="datetime-local"
            min="2022-09-01T00:00"
            max="2023-06-14T00:00"
            className="text-black"
            onChange={(e: any) => {
              setEndDate(new Date(e.target.value))
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
            onClick={() => createEvent()}
            active={true}
          />
        )}
      </div>
    </div>
  )
}
