import { useState } from 'react'

export default function LocalTimePicker() {
  /**similar to the datepicker, this will display an input with a default time value.
   * when the user clicks on it, a scrollable dropdown menu will appear. With the options
   * to show from start to end.
   */

  const [isActive, setIsActive] = useState(false)
  const [date, setDate] = useState({})

  return (
    <div>
      <input
        onChange={(e) => {
          setIsActive(!isActive)
        }}
        className={`focus:shadow-outline leading-0 z-0 block w-[100px] max-w-[400px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
        // id={id}
        type="text"
        placeholder={'09:00 PM'}
        disabled={false}
      />
      <div
        className={`${
          isActive ? 'absolute' : 'hidden'
        } z-10 h-[250px] w-[100px]  rounded-xl  bg-white`}
      ></div>
    </div>
  )
}
