import { doc, DocumentSnapshot, getDoc } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'
import ErrorFormMsg from '../../components/errorMsg'
import { db } from '../../services/firebase_config'
import DatePicker from 'react-datepicker'
import Spinner from '../../components/spinner'
import Button from '../../components/button'
import TextInput from '../../components/textInput'
import { uploadEventImage } from '../../services/upload_event_image'
import LocationInput from '../../components/locationInput'
import { LocationData } from '../../shared/interface/common'
import { useAuth } from '../../contexts/auth'
import { useRouter } from 'next/router'
import FileImageInput from '../../components/fileImageInput'
import { uploadEventInfo } from '../../services/upload_event_info'
import updateCreatedEventToUser from '../../services/update_created_event_to_user'

export default function EditEvent() {
  const [isUpdatingEvent, setIsUpdatingEvent] = useState(false)
  const [title, setTitle] = useState<string>('')
  const [eventId, setEventId] = useState<string>('') //the event id should be disabled.
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
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [errorField, setErrorField] = useState<string>('')
  const [currEventImgURl, setCurrEventImgURl] = useState('')
  const router = useRouter()
  const auth = useAuth()
  let previousCap: number
  const { eid } = router.query

  //edit event form validator.
  const validateEditEventForm = () => {
    if (
      eventLocation.address === '' ||
      eventLocation.lat === 0 ||
      eventLocation.long === 0
    ) {
      setErrorField('Location')
      setErrorMsg('event location is not selected')
      return false
    }

    if (startDate.getTime() === endDate.getTime()) {
      setErrorField('Start Date/End Date')
      setErrorMsg('start date and end date cannot have the same time period')
      return false
    }
    if (startDate.getTime() > endDate.getTime()) {
      setErrorField('Start Date/End Date')
      setErrorMsg('end date cannot be behind the start date schedule')
      return false
    }
    if (ticketMax < previousCap) {
      setErrorField('Tickets')
      setErrorMsg('event capacity cannot be lower than the previous capacity')
      return false
    }
    return true
  }

  const setFiletype = (type: string) => {
    if (true) {
      return '.jpg'
    }
    return '.png'
  }

  //fetch and set current event data to ui edit page.
  useEffect(() => {
    const setCurrentEventData = async () => {
      const eventId: any = eid
      const eventRef = doc(db, 'events', eventId)
      const eventDoc: DocumentSnapshot = await getDoc(eventRef)
      setCurrEventImgURl(eventDoc.data()?.img_url)
      setTitle(eventDoc.data()?.title)
      setEventId(eventDoc.data()?.event_id)
      setEventDescription(eventDoc.data()?.description)
      setEventLocation(eventDoc.data()?.location)
      setTicketMax(eventDoc.data()?.tickets_max)
      previousCap = eventDoc.data()?.tickets_max
      // setStartDate((eventDoc.data()?.start_date))
      // setEndDate(eventDoc.data()?.end_date)

      //update and pass the url so it will be used for
      //displaying the previous photo on the photo input
      // setFileImg()
    }
    if (eid) {
      setCurrentEventData()
    }
  }, [eid])

  //function for updating new event info to firestore
  const updateEvent = async () => {
    let isFormValid
    setIsUpdatingEvent(true)
    setErrorMsg('')
    isFormValid = validateEditEventForm()
    if (!isFormValid) {
      setIsUpdatingEvent(false)
      return
    }
    try {
      if (fileImg) {
        // TODO create a imgType setter, based from the selected file img.
        const storagePath = `${auth.uid}/${eventId + '.jpg'}`
        await uploadEventImage(fileImg, storagePath, async (url: string) => {
          await uploadEventInfo({
            title: title,
            end_date: endDate,
            start_date: startDate,
            uid: auth.uid,
            description: eventDescription,
            location: eventLocation,
            img_url: url,
            ticket_max: ticketMax,
            event_id: eventId
          })
          await updateCreatedEventToUser({
            eventTitle: title,
            uid: auth.uid,
            eventId: eventId,
            startDate: startDate,
            endDate: endDate
          })
        })
      } else {
        await uploadEventInfo({
          title: title,
          end_date: endDate,
          start_date: startDate,
          uid: auth.uid,
          description: eventDescription,
          location: eventLocation,
          img_url: currEventImgURl,
          ticket_max: ticketMax,
          event_id: eventId
        })
        await updateCreatedEventToUser({
          eventTitle: title,
          uid: auth.uid,
          eventId: eventId,
          startDate: startDate,
          endDate: endDate
        })
      }
      router.push(`/e/${eventId}`)
    } catch (e) {
      console.error('event/create:', e)
      alert(
        'error 404: form could not be created due to an unknown error, please try again later.'
      )
      setIsUpdatingEvent(false)
    }
  }

  //UI of the edit page.
  return (
    <div className="flex w-screen flex-col items-center space-y-[35px] bg-secondaryBg pb-[100px] pt-[35px]">
      <div className="flex w-full items-center justify-center">
        <span
          onClick={() => {
            router.back()
          }}
        >
          <div className="cursor-pointer">
            <IoChevronBack className="h-[40px] w-[40px]" />
          </div>
        </span>
        <h3 className="w-full max-w-[600px] border-b border-disabled">
          Edit Event
        </h3>
      </div>

      <div className="flex w-full max-w-[600px] flex-col items-start justify-start space-y-4">
        <TextInput
          id={'event_name'}
          labelText={'Title'}
          placeholder={title}
          setValue={setTitle}
          isDisabled={isUpdatingEvent}
        />
        <TextInput
          id={'event_id'}
          labelText={'URL'}
          placeholder={eventId}
          setValue={setEventId}
          isDisabled={true}
        />
        <TextInput
          textArea={true}
          id={'event_description'}
          labelText={'Description'}
          placeholder={eventDescription}
          setValue={setEventDescription}
          isDisabled={isUpdatingEvent}
        />
        <LocationInput
          labelText={'Location*'}
          id={'event_location'}
          placeholder={eventLocation.address}
          setLocation={setEventLocation}
        />
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
          <label className="mb-2 block text-sm font-medium text-gray-900 ">
            START DATE
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
          <label className="mb-2 block text-sm font-medium text-gray-900 ">
            END DATE
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
          <label className="mb-2 block text-sm font-medium text-gray-900 ">
            IMAGE
          </label>
          <FileImageInput
            fileImg={fileImg}
            setFileImg={setFileImg}
            imgUrlTemplate={currEventImgURl}
          />
        </div>
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
          <label className="mb-2 block text-sm font-medium text-gray-900 ">
            TICKET SUPPLY
          </label>
          <input
            onChange={(e) => {
              setTicketMax(parseInt(e.target.value))
            }}
            className={`focus:shadow-outline leading-0 h-full min-h-[56px] w-full max-w-[400px] rounded-[16px] border-[1.5px] ${
              isUpdatingEvent
                ? 'border-gray-300  text-gray-300'
                : 'border-black  text-gray-700'
            } px-2  focus:outline-none`}
            id={'event_ticket_max'}
            type="number"
            placeholder={'0'}
            disabled={isUpdatingEvent}
          />
        </div>
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
          {isUpdatingEvent ? (
            <>
              <Spinner width={40} height={40} />
              <p>Creating new event, please do not refresh</p>
            </>
          ) : (
            <Button
              type="submit"
              text={'update event'}
              onClick={() => updateEvent()}
              active={true}
            />
          )}
        </div>
        <div className="mx-auto text-[13px] ">
          {errorMsg === '' ? (
            <></>
          ) : (
            ErrorFormMsg({
              errorField: errorField,
              errorMsg: errorMsg
            })
          )}
        </div>
      </div>
    </div>
  )
}
