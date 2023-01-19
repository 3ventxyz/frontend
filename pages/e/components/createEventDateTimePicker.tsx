import LocalDatePicker from './datepicker'
import LocalTimePicker from './timepicker'

export default function CreateEventDateTimePicker({
  labelText,
  setDate,
  name,
  date
}: {
  labelText: string
  setDate: (name: string, date: Date) => void
  name: string
  date: Date
}) {
  return (
    <div className="flex w-full max-w-[400px] flex-col items-start space-y-1 text-[16px] font-normal">
      <label className="mb-2 block text-sm font-medium text-gray-900 ">
        {labelText}
      </label>
      <div className="flex space-x-3">
        <LocalDatePicker setDate={setDate} name={name} selectedDate={date} />
        <LocalTimePicker setDate={setDate} name={name} selectedDate={date} />
      </div>
    </div>
  )
}