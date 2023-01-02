import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/auth'
import 'react-datepicker/dist/react-datepicker.css'
import { startOfToday } from 'date-fns'
import { LocationData } from '../../shared/interface/common'
import TextInput from '../../components/textInput'
import LocalDatePicker from './components/datepicker'
import LocalTimePicker from './components/timepicker'
import LocationInput from '../../components/locationInput'
import EventLocationMap from './components/eventLocationMap'
import CreateEventStepsDisplay from './components/createEventStepsDisplay'
import FileImageInput from '../../components/fileImageInput'
import PredefinedEventPictures from './components/predefinedEventPictures'
import LandingPortraitImageInput from '../../components/landingPortraitImageInput'
import Button from '../../components/button'
import { useEvents } from '../../contexts/events'
import { uploadImageToStorage } from '../../services/upload_image_to_storage'
import CheckEventId from '../../services/check_event_id'
import setFiletype from '../../shared/utils/setFileType'

export default function CreateEvent() {
  const router = useRouter()
  const auth = useAuth()
  const events = useEvents()
  const stepsText = ['Step 1', 'Step 2', 'Step 3']
  const instructionsText = [
    'Event title, location and date',
    'Event description and ticket supply',
    'Event Images'
  ]
  let today: Date = startOfToday()
  let page: number = 0

  /**
   * input data UI setStates
   **/
  const [title, setTitle] = useState<string>('')
  const [startDate, setStartDate] = useState<Date>(today)
  const [endDate, setEndDate] = useState<Date>(today)
  const [isCreatingNewEvent, setIsCreatingNewEvent] = useState(false)
  const [eventLocation, setEventLocation] = useState<LocationData>({
    address: '',
    lat: 0,
    long: 0
  })
  const [eventId, setEventId] = useState<string>('test-id')
  const [eventDescription, setEventDescription] = useState<string>('')
  const [ticketMax, setTicketMax] = useState<number>(0)
  const [fileImg, setFileImg] = useState<File | null>(null)
  const [selectedPredefinedEventImgUrl, setSelectedPredefinedEventImgUrl] =
    useState<string>('')
  const [landingfileImg, setLandingFileImg] = useState<File | null>(null)
  const [selectedPredefinedLandingImgUrl, setSelectedPredefinedLandingImgUrl] =
    useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')

  /**
   * UI page setStates
   **/
  const [isStartDateDropdownVisible, setIsStartDateDropdownVisible] =
    useState(false)
  const [isStartTimeDropdownVisible, setIsStartTimeDropdownVisible] =
    useState(false)
  const [isEndDateDropdownVisible, setIsEndDateDropdownVisible] =
    useState(false)
  const [isEndTimeDropdownVisible, setIsEndTimeDropdownVisible] =
    useState(false)
  const [displayPredefinedTicketImgsMenu, setDisplayPredefinedTicketImgsMenu] =
    useState(false)
  const [
    displayPredefinedLandingImgsMenu,
    setDisplayPredefinedLandingImgsMenu
  ] = useState(false)
  const [currentStep, setCurrentStep] = useState<number>(page)

  /**
   * logic functions
   **/
  const togglePredefinedLandingImagesMenu = () => {
    setDisplayPredefinedLandingImgsMenu(!displayPredefinedLandingImgsMenu)
  }

  const togglePredefinedTicketImagesMenu = () => {
    setDisplayPredefinedTicketImgsMenu(!displayPredefinedTicketImgsMenu)
  }

  const nextPage = () => {
    page = currentStep
    page++
    setCurrentStep(page)
  }

  const prevPage = () => {
    page = currentStep
    page--
    setCurrentStep(page)
  }

  const submitData = () => {
    /*Logic for the submit button, for uploading the info to the 3vent database */
    console.log('===creating event===')
    console.log('title: ', title)
    console.log('startDate: ', startDate)
    console.log('endDate: ', endDate)
    console.log('eventLocation: ', eventLocation)
    console.log('eventDescription: ', eventDescription)
    console.log('ticketMax: ', ticketMax)
    console.log('fileImg: ', fileImg)
  }

  const createEvent = async () => {
    console.log('===creating event===')
    console.log('title: ', title)
    console.log('event_id: ', eventId)
    console.log('startDate: ', startDate)
    console.log('endDate: ', endDate)
    console.log('eventLocation: ', eventLocation)
    console.log('eventDescription: ', eventDescription)
    console.log('ticketMax: ', ticketMax)
    console.log('fileImg: ', fileImg)
    console.log('========================')

    let isFormValid
    setIsCreatingNewEvent(true)
    setErrorMsg('')
    isFormValid = formValidator()
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
      if (fileImg !== null) {
        console.log('fileImg: ', fileImg?.type)
        const fileType = setFiletype(fileImg)
        const storagePath: string = `${auth.uid}/${eventId + fileType}`
        console.log('uploading image: ', fileImg?.name)
        await uploadImageToStorage(
          fileImg,
          storagePath,
          async (url: string) => {
            await events.submitEventToFirebase(
              {
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
              },
              {
                title: title,
                uid: auth.uid,
                event_id: eventId,
                start_date: startDate,
                end_date: endDate
              }
            )
            console.log('pushing to event page')
            router.push(`/e/${eventId}`)
          }
        )
      } else {
        await events.submitEventToFirebase(
          {
            title: title,
            end_date: endDate,
            start_date: startDate,
            uid: auth.uid,
            description: eventDescription,
            location: eventLocation,
            img_url: selectedPredefinedEventImgUrl,
            ticket_max: ticketMax,
            event_id: eventId,
            registered_attendees: 0
          },
          {
            title: title,
            uid: auth.uid,
            event_id: eventId,
            start_date: startDate,
            end_date: endDate
          }
        )
        console.log('pushing to event page')
        router.push(`/e/${eventId}`)
      }
    } catch (e) {
      console.error('event/create:', e)
      alert(
        'error 404: form could not be created due to an unknown error, please try again later.'
      )
      setIsCreatingNewEvent(false)
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
      <div className="w-full max-w-[300px] space-y-10 pt-[60px] pb-[200px] sm:max-w-[400px] lg:max-w-[600px] ">
        <div>
          <h3>Create Event</h3>
          <hr />
        </div>
        <div id="create-event-form" className="flex space-x-5 ">
          <div className="flex max-w-[300px] flex-col  space-y-0 sm:max-w-[400px] lg:max-w-[600px]">
            <div id="step-1" className="">
              <h4>1.- Event title, location and date</h4>
              <hr />
              <div
                className={`${
                  currentStep == 0 ? 'h-full' : 'hidden h-[0px]'
                } my-[10px] flex flex-col space-y-3 transition-transform`}
              >
                <TextInput
                  id={'event_name'}
                  labelText={'Title'}
                  placeholder={''}
                  setValue={setTitle}
                  isDisabled={isCreatingNewEvent}
                />
                <LocationInput
                  labelText={'Location*'}
                  id={'event_location'}
                  placeholder={''}
                  setLocation={setEventLocation}
                />
                <EventLocationMap
                  lat={eventLocation.lat}
                  long={eventLocation.long}
                />
                <div className="flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    START DATE
                  </label>
                  <div className="flex space-x-3">
                    <LocalDatePicker
                      setSelectedDate={setStartDate}
                      selectedDate={startDate}
                      isDropDownActive={isStartDateDropdownVisible}
                      setIsDropDownActive={setIsStartDateDropdownVisible}
                    />
                    <LocalTimePicker
                      setSelectedDate={setStartDate}
                      selectedDate={startDate}
                      isDropDownActive={isStartTimeDropdownVisible}
                      setIsDropDownActive={setIsStartTimeDropdownVisible}
                    />
                  </div>
                </div>
                <div className="flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    END DATE
                  </label>
                  <div className="flex space-x-3">
                    <LocalDatePicker
                      setSelectedDate={setEndDate}
                      selectedDate={endDate}
                      isDropDownActive={isEndDateDropdownVisible}
                      setIsDropDownActive={setIsEndDateDropdownVisible}
                    />
                    <LocalTimePicker
                      setSelectedDate={setEndDate}
                      selectedDate={endDate}
                      isDropDownActive={isEndTimeDropdownVisible}
                      setIsDropDownActive={setIsEndTimeDropdownVisible}
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
                  currentStep == 1 ? 'h-full' : 'hidden h-[0px]'
                } my-[10px] flex flex-col space-y-3`}
              >
                <TextInput
                  textArea={true}
                  id={'event_description'}
                  labelText={'Description'}
                  placeholder={''}
                  setValue={setEventDescription}
                  isDisabled={isCreatingNewEvent}
                />

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
              </div>
            </div>
            <div id="step-3" className="h-[800px]">
              <h4>3.- Landing portrait and ticket image</h4>
              <hr />
              <br />
              <div
                className={`${
                  currentStep == 2 ? 'h-full' : 'hidden h-[0px]'
                } flex flex-col`}
              >
                <div>
                  <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
                    <div className="flex w-full justify-between ">
                      <label className="mb-2 block text-sm font-medium text-gray-900 ">
                        TICKET EVENT IMAGE
                      </label>
                      <span
                        onClick={togglePredefinedTicketImagesMenu}
                        className="text-blue-800 hover:cursor-pointer hover:underline"
                      >
                        Predefined Images
                      </span>
                    </div>
                    <div className="flex items-end ">
                      <div className="z-20">
                        <FileImageInput
                          fileImg={fileImg}
                          setFileImg={setFileImg}
                          imgUrlTemplate={selectedPredefinedEventImgUrl}
                        />
                      </div>
                      {fileImg === null && displayPredefinedTicketImgsMenu ? (
                        <div className="absolute right-[380px] z-10">
                          <PredefinedEventPictures
                            setSelectedPredefinedEventImgUrl={
                              setSelectedPredefinedEventImgUrl
                            }
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <br />
                <div className="flex flex-col space-y-7">
                  <div className="">
                    <label className="mb-2 block text-sm font-medium text-gray-900 ">
                      LANDING PORTRAIT IMAGE
                    </label>
                    <span
                      onClick={togglePredefinedLandingImagesMenu}
                      className="hover:cursor-pointer hover:underline"
                    >
                      predefined images
                    </span>
                  </div>
                  <div className="absolute z-10">
                    <FileImageInput
                      fileImg={landingfileImg}
                      setFileImg={setLandingFileImg}
                      imgUrlTemplate={selectedPredefinedLandingImgUrl}
                      mode={'landing'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sticky bottom-[0px] z-0 hidden lg:block">
            <CreateEventStepsDisplay currentStep={currentStep} />
          </div>
        </div>
      </div>
      <div className="sticky bottom-[0px] z-40 flex h-[80px] w-full  justify-center bg-white shadow-md">
        {/* button for pagination and submit newly created event. */}
        <div className="flex w-full max-w-[350px] items-center justify-between space-x-5 sm:max-w-[450px] lg:max-w-[700px]">
          <div>
            <div className="text-[17px] font-bold sm:text-[20px]">
              {stepsText[currentStep]}
            </div>
            <div className="text-[14px] sm:text-[16px]">
              {instructionsText[currentStep]}
            </div>
          </div>
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
                  // submitData()
                  createEvent()
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
