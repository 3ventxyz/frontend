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
import PredefinedImageOption from './components/predefinedImageOption'
import FileImageInput from '../../components/fileImageInput'
import PredefinedEventPictures from './components/predefinedEventPictures'
import LandingPortraitImageInput from '../../components/landingPortraitImageInput'

export default function CreateNew() {
  const router = useRouter()
  const auth = useAuth()
  let today: Date = startOfToday()

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
  const [currentSteps, setCurrentSteps] = useState<boolean[]>([
    true,
    false,
    false
  ])

  /**HTML code */
  return (
    <div className="flex w-full justify-center bg-secondaryBg">
      <div className="w-full max-w-[600px] space-y-10 pt-[60px] pb-[200px] ">
        <div>
          <h3>Create Event</h3>
          <hr />
        </div>
        <div id="create-event-form" className="flex">
          <div className="flex flex-col space-y-10">
            <div id="step-1">
              <h4>1.- Event title, location and date</h4>
              <hr />
              <br />
              <div
                className={`${
                  currentSteps[0] ? 'h-full' : 'h-[0px] '
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
              <div className="flex flex-col space-y-3">
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
            <div id="step-3">
              <h4>3.- Landing portrait and ticket image</h4>
              <hr />
              <br />
              <div className="flex w-full justify-evenly">
                <label className="mb-2 block text-sm font-medium text-gray-900 ">
                  Landing Portrait Image
                </label>
                <span>predefined images</span>
              </div>
              <div>
                <LandingPortraitImageInput title={title} />
              </div>
              <div className="flex flex-col">
                <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
                  <div className="flex w-full justify-evenly ">
                    <label className="mb-2 block text-sm font-medium text-gray-900 ">
                      Ticket Event Image
                    </label>
                    <span>predefined images</span>
                  </div>
                  <FileImageInput
                    fileImg={fileImg}
                    setFileImg={setFileImg}
                    imgUrlTemplate={selectedPredefinedEventImgUrl}
                  />
                  {fileImg === null ? (
                    <PredefinedEventPictures
                      setSelectedPredefinedEventImgUrl={
                        setSelectedPredefinedEventImgUrl
                      }
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <CreateEventStepsDisplay /> */}
    </div>
  )
}
