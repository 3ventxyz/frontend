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
import { NumberInput } from '../../components/inputs/numberInput'
import CreateEventTextInput from './components/createEventTextInput'
import CreateEventLocationInput from './components/createEventLocationInput'
import useCreateEventStatus from './hooks/create/useCreateEventStatus'
import useCreateEventValues from './hooks/create/useCreateEventValues'
import CreateEventFooter from './components/createEventFooter'
import CreateEventFormSection from './components/createEventFormSection'
import CreateEventDateTimePicker from './components/createEventDateTimePicker'
import CreateEventImageInput from './components/createEventImageInput'
import { CreateEventErrors, CreateEventInputs } from '../../shared/enums/enums'
import {
  CREATE_EVENT_INSTRUCTIONS,
  INPUT_FIELD
} from '../../shared/consts/consts'

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
  landing_img_url: '',
  tags: []
}

const createEventStatus: createEventStatusInterface = {
  currentStep: 0,
  isCreatingNewEvent: false,
  errorMsg: '',
  errorField: '',
  focusedInputField: CreateEventInputs.eventTitle,
  inputFieldName: INPUT_FIELD.eventTitle,
  inputFieldInstruction: CREATE_EVENT_INSTRUCTIONS.eventTitleInstr
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
      setTags,
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
    {
      onNextStep,
      onPrevStep,
      setCreatingNewEvent,
      // setCurrentStep,
      setErrorMsg,
      onFocus
    }
  ] = useCreateEventStatus(createEventStatus)
  //use focusInput

  /**
   * Logic functions
   **/
  const createEvent = async () => {
    let formError: CreateEventErrors
    let eventImgURL: string
    let landingPortraitURL: string
    let eventImgfileType: string
    let eventImgStoragePath: string
    let landingPortraitfileType: string
    let landingPortraitStoragePath: string
    setCreatingNewEvent(true)
    formError = await formValidator()
    if (formError !== CreateEventErrors.noError) {
      console.log('error: ' + formError)
      setCreatingNewEvent(false)
      setErrorMsg(formError)
      return
    }

    /**setting event_img_urls */
    try {
      if (values.event_file_img !== null) {
        eventImgfileType = setFiletype(values.event_file_img)
        eventImgStoragePath = `${auth.uid}/${
          values.event_id + '_event' + eventImgfileType
        }`
        eventImgURL = await uploadImageToStorage(
          values.event_file_img,
          eventImgStoragePath
        )
      } else {
        eventImgURL = values.event_img_url
      }

      /**setting landing_img_urls */
      if (values.landing_file_img !== null) {
        landingPortraitfileType = setFiletype(values.landing_file_img)
        landingPortraitStoragePath = `${auth.uid}/${
          values.event_id + '_portrait' + landingPortraitfileType
        }`
        landingPortraitURL = await uploadImageToStorage(
          values.landing_file_img,
          landingPortraitStoragePath
        )
      } else {
        landingPortraitURL = values.landing_img_url
      }

      //once both urls variables are setted, then we
      //can start to submit it and push it to the event screen.
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
          registered_attendees: 0,
          tags: values.tags
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
      <div className="flex  max-w-[325px] flex-col items-center justify-center space-y-10 pt-[60px] pb-[200px] sm:block sm:max-w-[400px] md:max-w-[600px] ">
        <div>
          <h3>Create Event</h3>
          <hr />
        </div>
        <div id="create-event-form" className="flex  ">
          <div className="flex max-w-[300px] flex-col space-y-3 sm:max-w-[400px] md:max-w-[600px]">
            {/* step 1 */}
            <CreateEventFormSection
              title={'1.- Event title, location and date'}
              childrenClassName="my-[10px]"
            >
              <CreateEventTextInput
                id={'event_name'}
                labelText={'Title'}
                placeholder={''}
                onPressEnter={onNextStep}
                setTextValue={setTextValue}
                name={'title'}
                onFocus={() => {
                  onFocus(CreateEventInputs.eventTitle)
                }}
                isDisabled={status.isCreatingNewEvent}
              />
              <CreateEventTextInput
                id={'event_id'}
                labelText={'Event ID*'}
                placeholder={''}
                setTextValue={setTextValue}
                onPressEnter={onNextStep}
                name={'event_id'}
                onFocus={() => {
                  onFocus(CreateEventInputs.eventId)
                }}
                isDisabled={status.isCreatingNewEvent}
              />
              <CreateEventLocationInput
                labelText={'Location*'}
                id={'event_location'}
                placeholder={''}
                name={'event_location'}
                onPressEnter={onNextStep}
                setLocation={setLocation}
              />
              <EventLocationMap
                lat={values.event_location.lat}
                long={values.event_location.long}
              />
              <CreateEventDateTimePicker
                labelText={'START DATE'}
                id={'event_date'}
                onFocus={() => {
                  onFocus(CreateEventInputs.EventDate)
                }}
                setDate={setDate}
                name={'start_date'}
                date={values.start_date}
              />
              <CreateEventDateTimePicker
                labelText={'END DATE'}
                onFocus={() => {
                  onFocus(CreateEventInputs.EventDate)
                }}
                onNextStep={() => {
                  onNextStep()
                  console.log('next step to description')
                }}
                setDate={setDate}
                name={'end_date'}
                date={values.end_date}
              />
            </CreateEventFormSection>
            {/* step 2 */}
            <CreateEventFormSection
              title={'2.- Description, tags, and max attendee cap'}
              childrenClassName="my-[10px]"
            >
              <CreateEventTextInput
                textArea={true}
                id={'event_description'}
                labelText={'Description'}
                placeholder={''}
                onFocus={() => {
                  onFocus(CreateEventInputs.eventDescription)
                }}
                setTextValue={setTextValue}
                name={'event_description'}
                isDisabled={status.isCreatingNewEvent}
              />
              <CreateEventTextInput
                id={'event_tags'}
                labelText={'Tags'}
                placeholder={''}
                setTextValue={setTags}
                onPressEnter={onNextStep}
                name={'tags'}
                onFocus={() => {
                  onFocus(CreateEventInputs.eventTags)
                }}
                isDisabled={status.isCreatingNewEvent}
              />
              <NumberInput
                id="event_ticket_max"
                labelText="TICKET SUPPLY"
                setNumberValue={setNumberValue}
                onPressEnter={onNextStep}
                onFocus={() => {
                  onFocus(CreateEventInputs.ticketMax)
                }}
                name={'ticket_max'}
                disabled={status.isCreatingNewEvent}
              />
            </CreateEventFormSection>
            {/* step 3 */}
            {/* set the id to this section just for the  */}
            <CreateEventFormSection
              title={'3.- Landing portrait and ticket image'}
              id={'image_section'}
              fatherClassName={'h-full space-y-[11px] md:h-[800px]'}
              childrenClassName={'md:items-start items-center'}
            >
              <CreateEventImageInput
                labelText={'TICKET EVENT IMAGE'}
                onFocus={() => {
                  onFocus(CreateEventInputs.images)
                }}
                fileImg={values.event_file_img}
                setFileImg={setFileImg}
                setPredefinedImgUrl={setPredefinedImgUrl}
                imgUrl={values.event_img_url}
                parentClassName={
                  'mx-auto flex w-full max-w-[400px] flex-col items-start text-[16px] font-normal'
                }
                imgMenuClassName={
                  'top-[600px] z-20 md:absolute md:py-[40px] md:px-[30px]'
                }
                landingMode={false}
              />
              <CreateEventImageInput
                labelText={'LANDING PORTRAIT IMAGES'}
                onFocus={() => {
                  onFocus(CreateEventInputs.images)
                }}
                fileImg={values.landing_file_img}
                setFileImg={setFileImg}
                setPredefinedImgUrl={setPredefinedImgUrl}
                imgUrl={values.landing_img_url}
                parentClassName={`${
                  values.event_location.address !== ''
                    ? 'top-[1700px]'
                    : 'top-[1525px]'
                } z-20 flex flex-col space-y-1 md:absolute md:w-[600px] md:left-[340px] md:space-y-0`}
                imgMenuClassName={'z-20 px-[15px] md:absolute md:top-[42px] '}
                landingMode={true}
              />
            </CreateEventFormSection>
          </div>
        </div>
      </div>
      <CreateEventFooter
        currentInput={status.focusedInputField}
        isCreatingNewEvent={status.isCreatingNewEvent}
        onPrevStep={onPrevStep}
        onNextStep={onNextStep}
        createEvent={createEvent}
        errorMsg={status.errorMsg}
        errorField={status.errorField}
        currInputField={status.inputFieldName}
        inputFieldInstr={status.inputFieldInstruction}
      />
    </div>
  )
}
