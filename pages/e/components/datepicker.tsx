import { useState } from 'react'

export default function LocalDatePicker() {
  /**TODO
   * Build a datepicker component with tailwindcss, where it displays the just a text input. Which
   * will work like a button.
   * when clicked on, it will show a modal component below it with a calendar to display the text.
   * When the user clicks a date on it, it will select the date and the modal component will close and the input
   * will be updated with the new selected date.
   * 		Also when the user selects a date, the date picker will have a time stamp created.This timestamp will be
   * used and merged with the timestamp from the timepicker.There must be a way to merge or update the same timestamp variable.
   * one with date and the other with a time.
   */
  const [isActive, setIsActive] = useState(false)
  const [date, setDate] = useState({})

  return (
    <div className='relative'>
      <input
        onChange={(e) => {setIsActive(!isActive)}}
        className={`focus:shadow-outline leading-0 block z-0 w-[150px] max-w-[400px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
        type="text"
        placeholder={'09/12/2020'}
        disabled={false}
      />
      <div className={`${isActive?'absolute': 'hidden'} z-10 w-[300px] h-[100px] rounded-xl  bg-white`}>

	  </div>
    </div>
  )
}
