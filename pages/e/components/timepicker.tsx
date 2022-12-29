import { useState } from 'react'
import { format, set } from 'date-fns'

export default function LocalTimePicker({
  selectedDate,
  setSelectedDate,
  isDropDownActive,
  setIsDropDownActive
}: {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  isDropDownActive: boolean
  setIsDropDownActive: (bool: boolean) => void
}) {
  /**similar to the datepicker, this will display an input with a default time value.
   * when the user clicks on it, a scrollable dropdown menu will appear. With the options
   * to show from start to end.
   */

  /**next step: define the setTime function that updates the date that the user has selected, and prop drill the
   * start and end date from the create event page.
   * lastly. update the ui of the page. */
  // const [isActive, setIsActive] = useState(false)
  return (
    <div>
      <input
        onClick={(e) => {
          // setIsActive(!isActive)
          setIsDropDownActive(!isDropDownActive)
        }}
        className={`focus:shadow-outline leading-0 z-0 block w-[100px] max-w-[400px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
        type="text"
        placeholder={format(selectedDate, 'hh:mm a')}
        disabled={false}
      />
      <div
        id="timepicker-dropdown"
        className={`${
          isDropDownActive ? 'absolute' : 'hidden'
        } sflex-nowrap z-10 flex  h-[250px] w-[100px] flex-col items-start space-y-3 overflow-y-auto rounded-xl bg-white pt-3 shadow-lg`}
      >
        {[...Array(24).keys()].map((el, index) => {
          const selectedTime = set(selectedDate, { hours: index, minutes: 0 })

          return (
            <div id={"time-picker-slot"} key={index} className="h-full timepicker-slot-css w-full hover:bg-sky-300">
              <div>
                <button
                  onClick={() => {
                    setSelectedDate(selectedTime)
                    setIsDropDownActive(false)
                    console.log(format(selectedTime, 'MM/dd/yyyy, hh:mm a'))
                  }}
                >
                  {format(selectedTime, 'hh:mm a')}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
