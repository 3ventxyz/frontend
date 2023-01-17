import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/auth'
import 'react-datepicker/dist/react-datepicker.css'
import { startOfToday } from 'date-fns'
import { createEventFormInterface } from '../../shared/interface/common'
import LocalDatePicker from './components/datepicker'
import LocalTimePicker from './components/timepicker'
import EventLocationMap from './components/eventLocationMap'
import CreateEventStepsDisplay from './components/createEventStepsDisplay'
import FileImageInput from '../../components/inputs/fileImageInput'
import PredefinedEventPictures from './components/predefinedEventPictures'
import Button from '../../components/buttons/button'
import { useEvents } from '../../contexts/events'
import { uploadImageToStorage } from '../../services/upload_image_to_storage'
import CheckEventId from '../../services/check_event_id'
import setFiletype from '../../shared/utils/setFileType'
import NumberInput from '../../components/inputs/numberInput'
import Spinner from '../../components/utils/spinner'
import CreateEventTextInput from './components/createEventTextInput'
import CreateEventLocationInput from './components/createEventLocationInput'
import useCreateEventStatus from './hooks/create/useCreateEventStatus'
import useCreateEventValues from './hooks/create/useCreateEventValues'

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
  file_img: null,
  landing_file_img: null,
  event_img_url: '',
  landing_img_url: ''
}

const createEventStatus = {
  currentStep: 0,
  isCreatingNewEvent: false,
  errorMsg: ''
}

export default function CreateEvent() {
  const router = useRouter()
  const auth = useAuth()
  const events = useEvents()
  let page: number = createEventStatus.currentStep

  /**
   * input data UI setStates
   **/
  const [
    values,
    {
      setTextValue,
      setNumberValue,
      setDate,
      setLocation,
      setFileImg,
      setPredefinedImgUrl
    }
  ] = useCreateEventValues({
    initialState: inputValues
  })

  /**
   * UI page state setStates
   **/
  const [status, { nextPage, prevPage, setCreatingNewEvent, setErrorMsg }] =
    useCreateEventStatus({
      initialState: createEventStatus
    })
  const [ticketImgsMenuVisible, setTicketImgsMenuVisible] = useState(true)
  const [landingImgsMenuVisible, setLandingImgsMenuVisible] = useState(true)

  /**
   * logic functions
   **/
  const onChangePredefinedImage = ({
    setPredefinedImgUrl,
    name,
    imgUrl,
    setMenuVisibility
  }: {
    setPredefinedImgUrl: (name: string, imgUrl: string) => void
    imgUrl: string
    name: string
    setMenuVisibility: (visibility: boolean) => void
  }) => {
    setPredefinedImgUrl(name, imgUrl)
    setMenuVisibility(false)
  }

  const createEvent = async () => {
    console.log('===creating event===')
    console.log('title: ', values.title)
    console.log('event_id: ', values.event_id)
    console.log('startDate: ', values.start_date)
    console.log('endDate: ', values.end_date)
    console.log('eventLocation: ', values.event_location)
    console.log('eventDescription: ', values.event_description)
    console.log('ticketMax: ', values.ticket_max)
    console.log('fileImg: ', values.file_img)
    console.log('========================')

    let isFormValid
    setCreatingNewEvent(true)
    setErrorMsg('')
    isFormValid = formValidator()
    if (!isFormValid) {
      setCreatingNewEvent(false)
      return
    }
    let isEventIdTaken = await CheckEventId(values.event_id)
    if (isEventIdTaken) {
      setCreatingNewEvent(false)
      setErrorMsg(
        'Event ID: event id has been taken, please enter a different id'
      )
      return
    }
    try {
      if (values.file_img !== null) {
        console.log('fileImg: ', values.file_img?.type)
        const fileType = setFiletype(values.file_img)
        const storagePath: string = `${auth.uid}/${values.event_id + fileType}`
        console.log('uploading image: ', values.file_img?.name)
        await uploadImageToStorage(
          values.file_img,
          storagePath,
          async (url: string) => {
            await events.submitEventToFirebase(
              {
                title: values.title,
                end_date: values.end_date,
                start_date: values.start_date,
                uid: auth.uid,
                description: values.event_description,
                location: values.event_location,
                img_url: url,
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
          }
        )
      } else if (
        values.event_img_url !== null &&
        values.landing_img_url !== null
      ) {
        await events.submitEventToFirebase(
          {
            title: values.title,
            end_date: values.end_date,
            start_date: values.start_date,
            uid: auth.uid,
            description: values.event_description,
            location: values.event_location,
            img_url: values.event_img_url,
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

  const formValidator = () => {
    /**TODO: migrate the form validator logic from the previous create event page to this function. */
    return true
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
          <div className="flex max-w-[300px] flex-col  space-y-0 sm:max-w-[400px] md:max-w-[600px]">
            <div id="step-1" className="">
              <h4>1.- Event title, location and date</h4>
              <hr />
              <div
                className={`${
                  status.currentStep == 0 ? 'h-full' : 'hidden h-[0px]'
                } my-[10px] flex flex-col space-y-3 transition-transform`}
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
                <div className="flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    START DATE
                  </label>
                  <div className="flex space-x-3">
                    <LocalDatePicker
                      setDate={setDate}
                      name={'start_date'}
                      selectedDate={values.start_date}
                    />
                    <LocalTimePicker
                      setDate={setDate}
                      name={'start_date'}
                      selectedDate={values.start_date}
                    />
                  </div>
                </div>
                <div className="flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    END DATE
                  </label>
                  <div className="flex space-x-3">
                    <LocalDatePicker
                      setDate={setDate}
                      name={'end_date'}
                      selectedDate={values.end_date}
                    />
                    <LocalTimePicker
                      setDate={setDate}
                      name={'end_date'}
                      selectedDate={values.end_date}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div id="step-2" className="">
              <h4>2.- Description and max attendee cap</h4>
              <hr />
              <div
                className={`${
                  status.currentStep == 1 ? 'h-full' : 'hidden h-[0px]'
                } my-[10px] flex flex-col space-y-3`}
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
                <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    TICKET SUPPLY
                  </label>
                  <NumberInput
                    setNumberValue={setNumberValue}
                    name={'ticket_max'}
                    disabled={status.isCreatingNewEvent}
                  />
                </div>
              </div>
            </div>
            <div id="step-3" className="h-full space-y-[11px] md:h-[800px]">
              <div>
                <h4>3.- Landing portrait and ticket image</h4>
              </div>
              <hr />
              <div
                className={`${
                  status.currentStep == 2 ? 'h-full' : 'hidden h-[0px]'
                } flex flex-col items-center space-y-3 md:items-start`}
              >
                <div>
                  <div className="mx-auto flex w-full max-w-[400px] flex-col items-start text-[16px] font-normal">
                    <div className="flex w-full justify-between">
                      <label className="mb-2 block text-sm font-medium text-gray-900 ">
                        TICKET EVENT IMAGE
                      </label>
                      <span
                        onClick={() => {
                          setTicketImgsMenuVisible(!ticketImgsMenuVisible)
                        }}
                        className="text-blue-800 hover:cursor-pointer hover:underline"
                      >
                        Predefined Images
                      </span>
                    </div>
                    <div className=" space-y-[5px] ">
                      <div className="z-10">
                        <FileImageInput
                          name={'file_img'}
                          fileImg={values.file_img}
                          setFileImg={setFileImg}
                          imgUrlTemplate={values.event_img_url ?? ''}
                        />
                      </div>
                      {values.file_img === null && ticketImgsMenuVisible ? (
                        <div className="top-[345px] z-20 md:absolute md:py-[40px] md:px-[30px]">
                          <PredefinedEventPictures
                            setSelectedPredefinedEventImgUrl={(
                              imgUrl: string
                            ) => {
                              onChangePredefinedImage({
                                name: 'event_img_url',
                                imgUrl: imgUrl,
                                setPredefinedImgUrl: setPredefinedImgUrl,
                                setMenuVisibility: setTicketImgsMenuVisible
                              })
                            }}
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <div className="top-[780px] z-20 flex flex-col space-y-1 md:absolute md:w-[600px] md:space-y-0">
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-900 md:mb-2 ">
                      LANDING PORTRAIT IMAGES
                    </label>
                    <span
                      onClick={() => {
                        setLandingImgsMenuVisible(!landingImgsMenuVisible)
                      }}
                      className="text-blue-800 hover:cursor-pointer hover:underline"
                    >
                      Predefined Images
                    </span>
                  </div>
                  <div className="z-10">
                    <FileImageInput
                      fileImg={values.landing_file_img}
                      name={'landing_file_img'}
                      setFileImg={setFileImg}
                      imgUrlTemplate={values.landing_img_url ?? ''}
                      mode={'landing'}
                    />
                  </div>
                  {landingImgsMenuVisible ? (
                    <div className="z-20 px-[15px] md:absolute md:top-[42px]">
                      <PredefinedEventPictures
                        setSelectedPredefinedEventImgUrl={(imgUrl: string) => {
                          onChangePredefinedImage({
                            imgUrl: imgUrl,
                            name: 'landing_img_url',
                            setPredefinedImgUrl: setPredefinedImgUrl,
                            setMenuVisibility: setLandingImgsMenuVisible
                          })
                        }}
                        landingMode={true}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="sticky bottom-[0px] z-0 hidden md:block">
            <CreateEventStepsDisplay
              currentStep={status.currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>
        </div>
      </div>
      <CreateEventFooter
        currentStep={status.currentStep}
        isCreatingNewEvent={status.isCreatingNewEvent}
        prevPage={prevPage}
        nextPage={nextPage}
        createEvent={createEvent}
      />
    </div>
  )
}

function CreateEventFooter({
  currentStep,
  isCreatingNewEvent,
  prevPage,
  nextPage,
  createEvent
}: {
  currentStep: number
  isCreatingNewEvent: boolean
  prevPage: () => void
  nextPage: () => void
  createEvent: () => void
}) {
  const stepsText = ['Step 1', 'Step 2', 'Step 3']
  const instructionsText = [
    'Event title, location and date',
    'Event description and ticket supply',
    'Event Images'
  ]
  return (
    <div className="sticky bottom-[0px] z-40 flex h-[80px] w-full  justify-center bg-white shadow-md">
      {/* button for pagination and submit newly created event. */}
      <div className="flex w-full max-w-[350px] items-center justify-between space-x-5 sm:max-w-[450px] md:max-w-[700px]">
        <div>
          <div className="text-[17px] font-bold sm:text-[20px]">
            {stepsText[currentStep]}
          </div>
          <div className="text-[14px] sm:text-[16px]">
            {instructionsText[currentStep]}
          </div>
        </div>
        {isCreatingNewEvent ? (
          <div className="flex items-center">
            <Spinner width={25} height={25} />
            <div className="ml-[10px]">Creating event, please wait...</div>
          </div>
        ) : (
          <div className="  flex space-x-2">
            <Button
              text={'Prev'}
              active={currentStep > 0 ? true : false}
              onClick={() => {
                prevPage()
              }}
            />
            {currentStep < 2 ? (
              <Button
                text={'Next'}
                active={currentStep < 2 ? true : false}
                onClick={() => {
                  nextPage()
                }}
              />
            ) : (
              <Button
                text={'Create Event'}
                active={true}
                onClick={() => {
                  createEvent()
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
