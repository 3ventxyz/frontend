// author: Marthel, Ben
import TextInput from '../../components/textInput'
import Button from '../../components/button'
import FileImageInput from '../../components/fileImageInput'
import { useState } from 'react'
import Spinner from '../../components/spinner'
import LocationInput from '../../components/locationInput'
import { LocationData } from '../../shared/interface/common'
import { uploadEventInfo } from '../../services/upload_event_info'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/auth'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { uploadImageToStorage } from '../../services/upload_image_to_storage'
import updateCreatedEventToUser from '../../services/update_created_event_to_user'
import CheckEventId from '../../services/check_event_id'
import ErrorFormMsg from '../../components/errorMsg'
import setFiletype from '../../shared/utils/setFileType'
import Image from 'next/image'
import PredefinedImageOption from './components/predefinedImageOption'

export default function CreateEvent() {
  const router = useRouter()
  const auth = useAuth()

  const staticImgUrl1: string = process.env.NEXT_PUBLIC_STATIC_IMAGE_URL_1 ?? ''
  const staticImgUrl2: string = process.env.NEXT_PUBLIC_STATIC_IMAGE_URL_2 ?? ''
  const staticImgUrl3: string = process.env.NEXT_PUBLIC_STATIC_IMAGE_URL_3 ?? ''
  const staticImgUrl4: string = process.env.NEXT_PUBLIC_STATIC_IMAGE_URL_4 ?? ''

  const [isCreatingNewEvent, setIsCreatingNewEvent] = useState(false)
  const [title, setTitle] = useState<string>('')
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
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [errorField, setErrorField] = useState<string>('')

  const [selectedPredefinedEventImgUrl, setSelectedPredefinedEventImgUrl] =
    useState<string>('')
  const [selectedPredefinedImgIndex, setSelectedPredefinedImgIndex] =
    useState<number>(0)

  const typeofFileValidator = (fileType: string) => {
    if (fileType === 'image/jpeg' || fileType === 'image/png') {
      console.log('valid image type', fileType)
      return true
    }
    console.error('invalid image type', fileType)
    return false
  }

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
    if (!typeofFileValidator(fileImg.type)) {
      setErrorField('Event Image')
      setErrorMsg(
        'Selected Image is invalid type. Please upload jpg or png image.'
      )
      return false
    }
    if (isNaN(ticketMax)) {
      setErrorField('Tickets')
      setErrorMsg('Please enter a valid number of tickets')
      return false
    }
    if (ticketMax === 0) {
      setErrorField('Tickets')
      setErrorMsg('please add a ticket supply higher than 0')
      return false
    }
    return true
  }

  const createEvent = async () => {
    let isFormValid
    setIsCreatingNewEvent(true)
    setErrorMsg('')
    isFormValid = validateForm()
    if (!isFormValid) {
      setIsCreatingNewEvent(false)
      return
    }
    let isEventIdTaken = await CheckEventId(eventId)
    if (isEventIdTaken) {
      setIsCreatingNewEvent(false)
      setErrorMsg(
        'Event ID: event id has been taken, please enter a different id'
      )
      return
    }
    try {
      console.log('fileImg: ', fileImg?.type)
      const fileType = setFiletype(fileImg)
      const storagePath = `${auth.uid}/${eventId + fileType}`
      console.log('uploading image: ', fileImg?.name)
      await uploadImageToStorage(fileImg, storagePath, async (url: string) => {
        const returnedId = await uploadEventInfo({
          title: title,
          end_date: endDate,
          start_date: startDate,
          uid: auth.uid,
          description: eventDescription,
          location: eventLocation,
          img_url: url,
          ticket_max: ticketMax,
          event_id: eventId,
          registered_attendees: 0
        })
        await updateCreatedEventToUser({
          eventTitle: title,
          uid: auth.uid,
          eventId: eventId,
          startDate: startDate,
          endDate: endDate
        })
        router.push(`/e/${eventId}`)
      })
    } catch (e) {
      console.error('event/create:', e)
      alert(
        'error 404: form could not be created due to an unknown error, please try again later.'
      )
      setIsCreatingNewEvent(false)
    }
  }

  return (
    <div className="flex w-screen flex-col items-center space-y-[35px] bg-secondaryBg pb-[100px] pt-[35px]">
      <h3 className="w-full max-w-[600px] border-b border-disabled">Event</h3>
      <div className="flex w-full max-w-[600px] flex-col items-start justify-start space-y-4">
        <TextInput
          id={'event_name'}
          labelText={'Title'}
          placeholder={''}
          setValue={setTitle}
          isDisabled={isCreatingNewEvent}
        />
        <div className="w-full">
          <TextInput
            id={'event_id'}
            labelText={'URL'}
            placeholder={'www.3vent.xyz/e/'}
            setValue={setEventId}
            isDisabled={isCreatingNewEvent}
          />
          <p className="mx-auto flex max-w-[400px] text-[14px]">
            *event id cannot be updated
          </p>
        </div>
        <TextInput
          textArea={true}
          id={'event_description'}
          labelText={'Description'}
          placeholder={''}
          setValue={setEventDescription}
          isDisabled={isCreatingNewEvent}
        />
        <LocationInput
          labelText={'Location*'}
          id={'event_location'}
          placeholder={''}
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
            imgUrlTemplate={selectedPredefinedEventImgUrl}
          />
          <div
            id="accordion-collapse"
            className="w-full "
            data-accordion="collapse"
          >
            <h4 className="w-full">
              <span>predefined images</span>
            </h4>
            <div className="flex flex-col items-center space-y-2">
              <p>
                In case that you don&apos;t have an image for your event. Please
                select one of the pictures that we offer.
              </p>
              <div className="flex space-x-2">
                <PredefinedImageOption
                  setSelectedPredefinedImgIndex={setSelectedPredefinedImgIndex}
                  setSelectedPredefinedEventImgUrl={
                    setSelectedPredefinedEventImgUrl
                  }
                  imgIndex={1}
                  selectedPredefinedImgIndex={selectedPredefinedImgIndex}
                  predefinedImgUrl={staticImgUrl1}
                />
                <PredefinedImageOption
                  setSelectedPredefinedImgIndex={setSelectedPredefinedImgIndex}
                  setSelectedPredefinedEventImgUrl={
                    setSelectedPredefinedEventImgUrl
                  }
                  imgIndex={2}
                  selectedPredefinedImgIndex={selectedPredefinedImgIndex}
                  predefinedImgUrl={staticImgUrl2}
                />
              </div>

              <div className="flex space-x-2">
                <PredefinedImageOption
                  setSelectedPredefinedImgIndex={setSelectedPredefinedImgIndex}
                  setSelectedPredefinedEventImgUrl={
                    setSelectedPredefinedEventImgUrl
                  }
                  imgIndex={3}
                  selectedPredefinedImgIndex={selectedPredefinedImgIndex}
                  predefinedImgUrl={staticImgUrl3}
                />
                <PredefinedImageOption
                  setSelectedPredefinedImgIndex={setSelectedPredefinedImgIndex}
                  setSelectedPredefinedEventImgUrl={
                    setSelectedPredefinedEventImgUrl
                  }
                  imgIndex={4}
                  selectedPredefinedImgIndex={selectedPredefinedImgIndex}
                  predefinedImgUrl={staticImgUrl4}
                />
              </div>
            </div>
          </div>
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
              text={'Create'}
              onClick={() => createEvent()}
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
