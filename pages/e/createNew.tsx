import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/auth'
import FirstStepInputs from './components/firstStepInputs'
import SecondStepInputs from './components/secondStepInputs'
import ThirdStepInputs from './components/thirdStepInputs'
import 'react-datepicker/dist/react-datepicker.css'
import { startOfToday } from 'date-fns'
import { LocationData } from '../../shared/interface/common'
import TextInput from '../../components/textInput'
import LocalDatePicker from './components/datepicker'
import LocalTimePicker from './components/timepicker'
import LocationInput from '../../components/locationInput'
import EventLocationMap from './components/eventLocationMap'

/**
 *
 * check the figma
 */

interface CreateNewEventInterface {}

export default function CreateNew() {
  const router = useRouter()
  const auth = useAuth()

  let today: Date = startOfToday()
  const [title, setTitle] = useState<string>('')
  const [startDate, setStartDate] = useState<Date>(today)
  const [endDate, setEndDate] = useState<Date>(today)
  const [isCreatingNewEvent, setIsCreatingNewEvent] = useState(false)
  const [eventLocation, setEventLocation] = useState<LocationData>({
    address: '',
    lat: 0,
    long: 0
  })

  // UI setStates

  const [completedSteps, setCompletedSteps] = useState<boolean[]>([
    false,
    false,
    false
  ])
  const [currentSteps, setCurrentSteps] = useState<boolean[]>([
    true,
    false,
    false
  ])

  const [isStartDateDropdownVisible, setIsStartDateDropdownVisible] =
    useState(false)
  const [isStartTimeDropdownVisible, setIsStartTimeDropdownVisible] =
    useState(false)
  const [isEndDateDropdownVisible, setIsEndDateDropdownVisible] =
    useState(false)
  const [isEndTimeDropdownVisible, setIsEndTimeDropdownVisible] =
    useState(false)

  const onClose = () => {
    if (isStartDateDropdownVisible) {
      setIsStartDateDropdownVisible(false)
    }
    if (isStartTimeDropdownVisible) {
      setIsStartTimeDropdownVisible(false)
    }
    if (isEndDateDropdownVisible) {
      setIsEndDateDropdownVisible(false)
    }
    if (isEndTimeDropdownVisible) {
      setIsEndTimeDropdownVisible(false)
    }
  }
  return (
    <div
      onClick={onClose}
      className="flex w-full justify-center bg-secondaryBg"
    >
      <div className="w-full max-w-[600px] space-y-10 pt-[60px] pb-[200px] ">
        <div>
          <h3>Create Event</h3>
          <hr />
        </div>
        <div id="create-event-form" className="flex">
          <div className="flex flex-col space-y-10">
            {/** bring back the inputs from these steps components
             * and
             */}
            {/* <FirstStepInputs isExpanded={true} /> */}

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
                <EventLocationMap lat={eventLocation.lat} long={eventLocation.long}/>
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
            <SecondStepInputs />
            <ThirdStepInputs />
          </div>
        </div>
      </div>

      {/* <div
        id="create-event-steps"
        className="fixed right-[460px]  top-[200px] flex  flex-col space-y-[10px] "
      >
        <Step
          num={1}
          stepInstruction={'Event title, location and date'}
          currentStep={true}
          isComplete={false}
        />
        <Step
          num={2}
          stepInstruction={'Event description and ticket supply'}
          currentStep={false}
          isComplete={true}
        />
        <Step
          num={3}
          stepInstruction={'Event Images'}
          currentStep={false}
          isComplete={false}
        />
      </div> */}
    </div>
  )
}

function Step({
  num,
  stepInstruction,
  currentStep,
  isComplete
}: {
  num?: number
  stepInstruction?: string
  currentStep?: boolean
  isComplete?: boolean
}) {
  return isComplete ? (
    <div
      className={`flex h-[50px] w-[180px] items-center space-x-[5px] rounded-xl border-[1px] border-[#BABABA]  bg-[#EDEDED] px-[5px] text-[#828282]`}
    >
      <div className="flex h-[28px] w-[30px] items-center justify-center rounded-3xl border-[1px] border-[#BABABA] bg-white">
        {num}
      </div>
      <div className="w-[150px]">{stepInstruction}</div>
    </div>
  ) : (
    <div
      className={`flex h-[50px] w-[180px] items-center space-x-[5px] rounded-xl border-[1px] border-black ${
        currentStep ? 'bg-[#B6CFFF]' : 'bg-white'
      } px-[5px]`}
    >
      <div className="flex h-[28px] w-[30px] items-center justify-center rounded-3xl border-[1px] border-black bg-white">
        {num}
      </div>
      <div className="w-[150px]">{stepInstruction}</div>
    </div>
  )
}
