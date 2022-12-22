import { useState } from 'react'
import DatePicker from 'react-datepicker'
import LocationInput from '../../../components/locationInput'
import TextInput from '../../../components/textInput'
import { LocationData } from '../../../shared/interface/common'

export default function FirstStepInputs() {
  const [title, setTitle] = useState<string>('')
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [isCreatingNewEvent, setIsCreatingNewEvent] = useState(false)
  const [eventLocation, setEventLocation] = useState<LocationData>({
    address: '',
    lat: 0,
    long: 0
  })
  ;
  return <div id="step-1">
    <h4>1.- Event title, location and date</h4>
    <hr />
    <div className="flex flex-col">
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
    </div>
  </div>
}
