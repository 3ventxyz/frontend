import { useState } from 'react'

export default function LocalTimePicker() {
  /**similar to the datepicker, this will display an input with a default time value.
   * when the user clicks on it, a scrollable dropdown menu will appear. With the options
   * to show from start to end.
   */

  const [isActive, setIsActive] = useState(false)
  const [date, setDate] = useState({})

  const setTime = () => {}

  return (
    <div>
      <input
        onClick={(e) => {
          setIsActive(!isActive)
        }}
        className={`focus:shadow-outline leading-0 z-0 block w-[100px] max-w-[400px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
        // id={id}
        type="text"
        placeholder={'09:00 PM'}
        disabled={false}
      />
      <div
      id="timepicker-dropdown"
        className={`${
          isActive ? 'absolute' : 'hidden'
        } z-10 flex h-[250px]  w-[100px] flex-col flex-nowrap items-start space-y-3 overflow-y-auto rounded-xl bg-white pt-3 shadow-lg`}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((el, index) => {
          return (
            <div className="hover:bg-sky-300 w-full h-full">
              <div>
                <button>{index}:00 AM</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
