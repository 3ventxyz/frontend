import { useState } from 'react'
import { format, set } from 'date-fns'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'
export default function LocalTimePicker({
  selectedDate,
  name,
  setDate,
  onNextStep = () => {}
}: {
  selectedDate: Date
  name: string
  setDate: (name: string, date: Date) => void
  onNextStep?: () => void
}) {
  // dropdown toggler
  const [dropdown, setDropdown] = useState(false)
  return (
    <div>
      <div
        onClick={() => {
          setDropdown(!dropdown)
        }}
        className={` leading-0 z-0 flex w-[106px] max-w-[400px] items-center justify-between  rounded-lg border-[1.5px] bg-gray-50 py-2.5 px-1.5 text-sm text-gray-900 hover:cursor-pointer ${
          dropdown
            ? 'shadow-outline border-blue-500 outline-none ring-blue-500 '
            : ''
        }`}
      >
        <div>{format(selectedDate, 'hh:mm a')}</div>
        {dropdown ? (
          <RiArrowDropUpLine className="h-[20px] w-[20px]" />
        ) : (
          <RiArrowDropDownLine className="h-[20px] w-[20px]" />
        )}
      </div>
      <div
        id="timepicker-dropdown"
        className={`${
          dropdown ? 'absolute' : 'hidden'
        } z-10 flex  h-[250px] w-[106px] flex-col items-start  overflow-y-auto rounded-b-xl bg-white pt-1 shadow-lg`}
      >
        {[...Array(24).keys()].map((el, index) => {
          const selectedTime = set(selectedDate, { hours: index, minutes: 0 })

          return (
            <div id={'time-picker-slot'} key={index} className="w-full ">
              <div className="flex h-[30px] items-center justify-center hover:bg-sky-200 hover:font-semibold">
                <div>
                  <button
                    onClick={() => {
                      setDate(name, selectedTime)
                      setDropdown(false)
                      onNextStep()
                      console.log(format(selectedTime, 'MM/dd/yyyy, hh:mm a'))
                    }}
                  >
                    {format(selectedTime, 'hh:mm a')}
                  </button>
                </div>
              </div>
              <hr />
            </div>
          )
        })}
      </div>
    </div>
  )
}
