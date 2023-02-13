import LocalDatePicker from './datepicker'
import LocalTimePicker from './timepicker'

export default function CreateEventDateTimePicker({
  labelText,
  setDate,
  name,
  date,
  //for the
  onFocus = () => {},
  //for the end date time selected
  onNextStep = () => {},
  id = ''
}: {
  labelText: string
  setDate: (name: string, date: Date) => void
  name: string
  date: Date
  id?: string
  onFocus?: () => void
  onNextStep?: () => void
}) {
  return (
    <div className="flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
      <label className="mb-2 block text-sm font-medium text-gray-900 ">
        {labelText}
      </label>
      <div
        onClick={() => {
          onFocus()
        }}
        id={id}
        className="flex space-x-3"
      >
        <LocalDatePicker setDate={setDate} name={name} selectedDate={date} />
        <LocalTimePicker
          setDate={setDate}
          name={name}
          onNextStep={onNextStep}
          selectedDate={date}
        />
      </div>
    </div>
  )
}
