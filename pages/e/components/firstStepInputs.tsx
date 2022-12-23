import { useState } from 'react'
import DatePicker from 'react-datepicker'
import LocationInput from '../../../components/locationInput'
import TextInput from '../../../components/textInput'
import { LocationData } from '../../../shared/interface/common'
import LocalDatePicker from './datepicker'
import LocalTimePicker from './timepicker'

export default function FirstStepInputs({
  isExpanded = true
}: {
  isExpanded: boolean
}) {
  const [title, setTitle] = useState<string>('')
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [isCreatingNewEvent, setIsCreatingNewEvent] = useState(false)
  const [eventLocation, setEventLocation] = useState<LocationData>({
    address: '',
    lat: 0,
    long: 0
  })
  return (
    <div id="step-1">
      <h4>1.- Event title, location and date</h4>
      <hr />
      <br />
      <div
        className={`${
          isExpanded ? 'h-full' : 'h-[0px] '
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
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
          <label className="mb-2 block text-sm font-medium text-gray-900 ">
            START DATE
          </label>
          <div className="flex space-x-3">
            <LocalDatePicker />
            <LocalTimePicker />
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
          <label className="mb-2 block text-sm font-medium text-gray-900 ">
            END DATE
          </label>
          <div className="flex space-x-3">
            <LocalDatePicker />
            <LocalTimePicker />
          </div>
        </div>
      </div>
    </div>
  )
}
