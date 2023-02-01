import React from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/auth'
import 'react-datepicker/dist/react-datepicker.css'
import { startOfToday } from 'date-fns'
import {
  createEventFormInterface,
  createEventStatusInterface
} from '../../shared/interface/common'
import EventLocationMap from './components/eventLocationMap'
import CreateEventStepsDisplay from './components/createEventStepsDisplay'
import { useEvents } from '../../contexts/events'
import { uploadImageToStorage } from '../../services/upload_image_to_storage'
import setFiletype from '../../shared/utils/setFileType'
import NumberInput from '../../components/inputs/numberInput'
import CreateEventTextInput from './components/createEventTextInput'
import CreateEventLocationInput from './components/createEventLocationInput'
import useCreateEventStatus from './hooks/create/useCreateEventStatus'
import useCreateEventValues from './hooks/create/useCreateEventValues'
import CreateEventFooter from './components/createEventFooter'
import CreateEventFormSection from './components/createEventFormSection'
import CreateEventDateTimePicker from './components/createEventDateTimePicker'
import CreateEventImageInput from './components/createEventImageInput'
import { CreateEventErrors } from '../../shared/enums/enums'

const inputValues: createEventFormInterface = {
  title: '',
  start_date: startOfToday(),
  end_date: startOfToday(),
  event_location: {
    address: '',
    lat: 0,
    long: 0
  },
  event_id: '',
  event_description: '',
  ticket_max: 0,
  event_file_img: null,
  landing_file_img: null,
  event_img_url: '',
  landing_img_url: ''
}

const createEventStatus: createEventStatusInterface = {
  currentStep: 0,
  isCreatingNewEvent: false,
  errorMsg: '',
  errorField: ''
}

export default function CreateEvent() {
  const router = useRouter()
  const auth = useAuth()
  const events = useEvents()
  const [
    values,
    {
      setTextValue,
      setNumberValue,
      setDate,
      setLocation,
      setFileImg,
      setPredefinedImgUrl,
      formValidator
    }
  ] = useCreateEventValues(inputValues)

  /**
   * UI page state setStates
   **/
  const [
    status,
    { nextPage, prevPage, setCreatingNewEvent, setCurrentStep, setErrorMsg }
  ] = useCreateEventStatus(createEventStatus)

  /**
   * logic functions
   **/
  const createEvent = async () => {
    let formError: CreateEventErrors
    setCreatingNewEvent(true)
    formError = await formValidator()
    if (formError !== CreateEventErrors.noError) {
      setCreatingNewEvent(false)
      setErrorMsg(formError)
      return
    }
    try {
      if (values.event_file_img !== null && values.landing_file_img !== null) {
        //this part can be moved to a function for creating storage urls.
        console.log('fileImg: ', values.event_file_img?.type)
        console.log('uploading image: ', values.landing_file_img?.name)
        const eventImgfileType = setFiletype(values.event_file_img)
        const landingPortraitfileType = setFiletype(values.landing_file_img)
        const eventImgStoragePath: string = `${auth.uid}/${
          values.event_id + '_event' + eventImgfileType
        }`
        const landingPortraitStoragePath: string = `${auth.uid}/${
          values.event_id + '_portrait' + landingPortraitfileType
        }`
        const eventImgURL: string = await uploadImageToStorage(
          values.event_file_img,
          eventImgStoragePath
        )
        const landingPortraitURL: string = await uploadImageToStorage(
          values.landing_file_img,
          landingPortraitStoragePath
        )
        await events.submitEventToFirebase(
          {
            title: values.title,
            end_date: values.end_date,
            start_date: values.start_date,
            uid: auth.uid,
            description: values.event_description,
            location: values.event_location,
            img_url: eventImgURL,
            landing_portrait_url: landingPortraitURL,
            ticket_max: values.ticket_max,
            event_id: values.event_id,
            registered_attendees: 0
          },
          {
            title: values.title,
            uid: auth.uid,
            event_id: values.event_id,
            start_date: values.start_date,
            end_date: values.end_date
          }
        )
        console.log('pushing to event page')
        router.push(`/e/${values.event_id}`)
      } else if (
        values.event_img_url !== null &&
        values.landing_img_url !== null
      ) {
        //this one will be kept, when both predefined images are selected.
        await events.submitEventToFirebase(
          {
            title: values.title,
            end_date: values.end_date,
            start_date: values.start_date,
            uid: auth.uid,
            description: values.event_description,
            location: values.event_location,
            img_url: values.event_img_url,
            landing_portrait_url: values.landing_img_url,
            ticket_max: values.ticket_max,
            event_id: values.event_id,
            registered_attendees: 0
          },
          {
            title: values.title,
            uid: auth.uid,
            event_id: values.event_id,
            start_date: values.start_date,
            end_date: values.end_date
          }
        )
        console.log('pushing to event page')
        router.push(`/e/${values.event_id}`)
      } else {
        throw 'no image selected'
      }
    } catch (e) {
      console.error('event/create:', e)
      alert(
        'error 404: form could not be created due to an unknown error, please try again later.'
      )
      setCreatingNewEvent(false)
    }
  }

  /**
   * HTML code
   **/
  return (
    <div className="flex w-full flex-col items-center bg-secondaryBg">
      <div className="flex w-full max-w-[325px] flex-col items-center space-y-10 pt-[60px] pb-[200px] sm:block sm:max-w-[400px] md:max-w-[600px] ">
        <div>
          <h3>Create Event</h3>
          <hr />
        </div>
        <div id="create-event-form" className="flex space-x-5 ">
          <div className="flex max-w-[300px] flex-col space-y-0 sm:max-w-[400px] md:max-w-[600px]">
            {/* step 1 */}
            <CreateEventFormSection
              isExpanded={status.currentStep == 0}
              title={'1.- Event title, location and date'}
              childrenClassName="my-[10px]"
            >
              <CreateEventTextInput
                id={'event_name'}
                labelText={'Title'}
                placeholder={''}
                setTextValue={setTextValue}
                name={'title'}
                isDisabled={status.isCreatingNewEvent}
              />
              <CreateEventTextInput
                id={'event_id'}
                labelText={'Event ID*'}
                placeholder={''}
                setTextValue={setTextValue}
                name={'event_id'}
                isDisabled={status.isCreatingNewEvent}
              />
              <CreateEventLocationInput
                labelText={'Location*'}
                id={'event_location'}
                placeholder={''}
                name={'event_location'}
                setLocation={setLocation}
              />
              <EventLocationMap
                lat={values.event_location.lat}
                long={values.event_location.long}
              />
              <CreateEventDateTimePicker
                labelText={'START DATE'}
                setDate={setDate}
                name={'start_date'}
                date={values.start_date}
              />
              <CreateEventDateTimePicker
                labelText={'END DATE'}
                setDate={setDate}
                name={'end_date'}
                date={values.end_date}
              />
            </CreateEventFormSection>
            {/* step 2 */}
            <CreateEventFormSection
              isExpanded={status.currentStep == 1}
              title={'2.- Description and max attendee cap'}
              childrenClassName="my-[10px]"
            >
              <CreateEventTextInput
                textArea={true}
                id={'event_description'}
                labelText={'Description'}
                placeholder={''}
                setTextValue={setTextValue}
                name={'event_description'}
                isDisabled={status.isCreatingNewEvent}
              />
              <NumberInput
                labelText="TICKET SUPPLY"
                setNumberValue={setNumberValue}
                name={'ticket_max'}
                disabled={status.isCreatingNewEvent}
              />
            </CreateEventFormSection>
            {/* step 3 */}
            <CreateEventFormSection
              isExpanded={status.currentStep == 2}
              title={'3.- Landing portrait and ticket image'}
              fatherClassName={'h-full space-y-[11px] md:h-[800px]'}
              childrenClassName={'md:items-start items-center'}
            >
              <CreateEventImageInput
                labelText={'TICKET EVENT IMAGE'}
                fileImg={values.event_file_img}
                setFileImg={setFileImg}
                setPredefinedImgUrl={setPredefinedImgUrl}
                imgUrl={values.event_img_url}
                parentClassName={
                  'mx-auto flex w-full max-w-[400px] flex-col items-start text-[16px] font-normal'
                }
                imgMenuClassName={
                  'top-[345px] z-20 md:absolute md:py-[40px] md:px-[30px]'
                }
                landingMode={false}
              />
              <CreateEventImageInput
                labelText={'LANDING PORTRAIT IMAGES'}
                fileImg={values.landing_file_img}
                setFileImg={setFileImg}
                setPredefinedImgUrl={setPredefinedImgUrl}
                imgUrl={values.landing_img_url}
                parentClassName={
                  'top-[780px] z-20 flex flex-col space-y-1 md:absolute md:w-[600px] md:space-y-0'
                }
                imgMenuClassName={'z-20 px-[15px] md:absolute md:top-[42px]'}
                landingMode={true}
              />
            </CreateEventFormSection>
          </div>
          <CreateEventStepsDisplay
            currentStep={status.currentStep}
            setCurrentStep={setCurrentStep}
            isCreatingEvent={status.isCreatingNewEvent}
          />
        </div>
      </div>
      <CreateEventFooter
        currentStep={status.currentStep}
        isCreatingNewEvent={status.isCreatingNewEvent}
        prevPage={prevPage}
        nextPage={nextPage}
        createEvent={createEvent}
        errorMsg={status.errorMsg}
        errorField={status.errorField}
      />
    </div>
  )
}
