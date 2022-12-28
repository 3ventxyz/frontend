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

export default function CreateEvent() {
  const router = useRouter()
  const auth = useAuth()
  let today: Date = startOfToday()
  let page: number = 0

  /**input data UI setStates */
  const [title, setTitle] = useState<string>('')
  const [startDate, setStartDate] = useState<Date>(today)
  const [endDate, setEndDate] = useState<Date>(today)
  const [isCreatingNewEvent, setIsCreatingNewEvent] = useState(false)
  const [eventLocation, setEventLocation] = useState<LocationData>({
    address: '',
    lat: 0,
    long: 0
  })

  const [eventDescription, setEventDescription] = useState<string>('')
  const [ticketMax, setTicketMax] = useState<number>(0)
  const [fileImg, setFileImg] = useState<File | null>(null)
  const [selectedPredefinedEventImgUrl, setSelectedPredefinedEventImgUrl] =
    useState<string>('')

  /** UI page setStates */
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

  /**functions */
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
    /** logic for the submit button, for uploading the info to the 3vent database */
  }

  /**HTML code */
  return (
    <div className="flex  w-full flex-col items-center bg-secondaryBg">
      <div className="w-full max-w-[600px]  space-y-10 pt-[60px] pb-[200px]">
        <div>
          <h3>Create Event</h3>
          <hr />
        </div>
        <div id="create-event-form" className="flex space-x-5 ">
          <div className="flex max-w-[400px] flex-col space-y-0">
            <div id="step-1">
              <h4>1.- Event title, location and date</h4>
              <hr />
              <br />
              <div
                className={`${
                  currentStep == 0 ? 'h-full' : 'hidden h-[0px]'
                } flex flex-col space-y-3 transition-transform`}
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
                <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
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
                <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
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
            <div id="step-2">
              <h4>2.- Description and max attendee cap</h4>
              <hr />
              <br />
              <div
                className={`${
                  currentStep == 1 ? 'h-full' : 'hidden h-[0px]'
                } flex flex-col space-y-3`}
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
                }flex flex-col`}
              >
                <div>
                  <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
                    <div className="flex w-full justify-between ">
                      <label className="mb-2 block text-sm font-medium text-gray-900 ">
                        Ticket Event Image
                      </label>
                      <span
                        onClick={togglePredefinedTicketImagesMenu}
                        className="text-blue-800 hover:cursor-pointer hover:underline"
                      >
                        Predefined Images
                      </span>
                    </div>
                    <div className="flex items-center ">
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

                <div className="flex flex-col space-y-5">
                  <div className="flex w-full justify-evenly">
                    <label className="mb-2 block text-sm font-medium text-gray-900 ">
                      Landing Portrait Image
                    </label>
                    <span
                      onClick={togglePredefinedLandingImagesMenu}
                      className="hover:cursor-pointer hover:underline"
                    >
                      predefined images
                    </span>
                  </div>
                  <div className="absolute">
                    <LandingPortraitImageInput title={title} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sticky bottom-[0px]">
            <CreateEventStepsDisplay currentStep={currentStep} />
          </div>
        </div>
      </div>
      <div className="sticky z-40 bottom-[0px]  my-[5px] flex h-[80px] w-[800px] items-center justify-center rounded-3xl bg-[#f0eded]   shadow-xl">
        {/* button for pagination and submit newly created event. */}
        <div className="flex w-full max-w-[600px] justify-between space-x-5">
          <Button
            text={'Prev'}
            active={currentStep > 0 ? true : false}
            onClick={() => {
              prevPage()
            }}
          />
          <Button
            text={'Next'}
            active={currentStep < 2 ? true : false}
            onClick={() => {
              nextPage()
            }}
          />
        </div>
      </div>
    </div>
  )
}
