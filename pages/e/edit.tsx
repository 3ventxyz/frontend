import { doc, DocumentSnapshot, getDoc } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import ErrorFormMsg from '../../components/errorMsg'
import { db } from '../../services/firebase_config'
import DatePicker from 'react-datepicker'
import Spinner from '../../components/spinner'
import Button from '../../components/button'
import TextInput from '../../components/textInput'
import { uploadImage } from '../../services/upload_image'
import LocationInput from '../../components/locationInput'
import { LocationData } from '../../shared/interface/common'
import { useAuth } from '../../contexts/auth'
import { useRouter } from 'next/router'
import FileImageInput from '../../components/fileImageInput'

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
  const [ticketMax, setTicketMax] = useState<number>(0) //disabled
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [errorField, setErrorField] = useState<string>('')
  const router = useRouter()
  const auth = useAuth()
  const { eid } = router.query

  //   TODO migrate to a different file
  const validateForm = () => {
    if (title === '') {
      setErrorField('Event Title')
      setErrorMsg('title is empty')
      return false
    }
    if (eventId === '') {
      setErrorField('Event id')
      setErrorMsg('event id is empty, please add a custom id')
      return false
    }
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
    if (!fileImg) {
      setErrorField('Event Image')
      setErrorMsg('file img is null')
      return false
    }
    if (ticketMax === 0) {
      setErrorField('Tickets')
      setErrorMsg('please add a ticket supply higher than 0')
      return false
    }
    return true
  }

  //fetch and set current event data to ui edit page.
  useEffect(() => {
    const setCurrentEventData = async () => {
      const eventId: any = eid
      console.trace('eventId obtained', eventId)
      const eventRef = doc(db, 'events', eventId)
      const eventDoc: DocumentSnapshot = await getDoc(eventRef)
      // const eventData:EventInterface = events.newEventData(eventDoc);

      console.log('description: ', eventDoc.data()?.description)
      console.log('end_date: ', eventDoc.data()?.end_date)
      console.log('start_date: ', eventDoc.data()?.start_date)
      console.log('event_id: ', eventDoc.data()?.event_id)
      console.log('img_url: ', eventDoc.data()?.img_url)
      console.log('location: ', eventDoc.data()?.location)
      console.log('tickets_max: ', eventDoc.data()?.tickets_max)
      console.log('title: ', eventDoc.data()?.title)
      console.log('uid: ', eventDoc.data()?.uid)

      setTitle(eventDoc.data()?.title)
      setEventId(eventDoc.data()?.event_id)
      setEventDescription(eventDoc.data()?.description)
      setEventLocation(eventDoc.data()?.location)
      //update and pass the url so it will be used for
      //displaying the previous photo on the photo input
      // setFileImg()
      setTicketMax(eventDoc.data()?.tickets_max)
      // setStartDate((eventDoc.data()?.start_date))
      // setEndDate(eventDoc.data()?.end_date)

      //setState all the obtained data to the front end ui.!!!
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
    isFormValid = validateForm()
    if (!isFormValid) {
      setIsUpdatingEvent(false)
      return
    }
    //event id is not needed to take a look again.
    const path = `${auth.uid}/${fileImg?.name}`

    try {
      //set a new function called updateImage.
      //where it updates the current image with the new one,
      //exactly to the path of where is stored.
      // await uploadImage(fileImg, path, async (url: string) => {
      // 	const returnedId = await createNewEvent({
      // 	title: title,
      // 	end_date: endDate,
      // 	start_date: startDate,
      // 	uid: auth.uid,
      // 	description: eventDescription,
      // 	location: eventLocation,
      // 	img_url: url,
      // 	ticket_max: ticketMax,
      // 	event_id: eventId
      //   })
      //rename to updateCreatedEventDocument()
      // await addEventToUpcomingEvents({
      // eventTitle: title,
      // uid: auth.uid,
      // eventId: eventId,
      // startDate: startDate,
      // endDate: endDate
      // })

      //reroute the user back to the previous event.
      //and it will refresh with the new data.
      router.push(`/e/${eventId}`)
      // })
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
        {/* <div>back</div> add a back arrow that pops back to the previous page */}
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
          {/* update the logic of fileImageInput, where if a url is
              passed, use the url as the display of the input.
          */}
          <FileImageInput fileImg={fileImg} setFileImg={setFileImg} />
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
