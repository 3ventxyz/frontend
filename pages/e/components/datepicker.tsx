import {
  eachDayOfInterval,
  startOfToday,
  endOfMonth,
  startOfMonth,
  format
} from 'date-fns'
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
  const [date, setDate] = useState(new Date())

  const setMonth = () => {}
  const setYear = () => {}
  const setDay = () => {}
  const nextPage = () => {}
  const prevPage = () => {}

  let today: any = startOfToday()

  let newDays: any = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today)
  })
  return (
    <div className="relative">
      <input
        onClick={(e) => {
          /** pass the div from the outside place and update */
          setIsActive(!isActive)
        }}
        className={`focus:shadow-outline leading-0 z-0 block w-[150px] max-w-[400px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
        type="text"
        placeholder={'09/12/2020'}
        disabled={false}
      />
      <div
        className={`${
          isActive ? 'absolute' : 'hidden'
        } z-10 h-[240px] w-[280px] rounded-xl  bg-white`}
      >
        <div className="flex justify-evenly">
          <div className="hover:cursor-pointer">{'<'}</div>
          {/* <div>{'September'}</div>
          <div>{'2022'}</div> */}
          <div>{format(today, 'MMM yyyy')}</div>
          <div className="hover:cursor-pointer">{'>'}</div>
        </div>
        <div id="calendar" className="flex flex-col items-center space-y-2">
          <div id="row-1" className="flex space-x-3">
            <div className="flex h-[25px] w-[25px] items-center justify-center font-bold">
              S{' '}
            </div>
            <div className="flex h-[25px] w-[25px] items-center justify-center font-bold">
              M{' '}
            </div>
            <div className="flex h-[25px] w-[25px] items-center justify-center font-bold">
              T{' '}
            </div>
            <div className="flex h-[25px] w-[25px] items-center justify-center font-bold">
              W{' '}
            </div>
            <div className="flex h-[25px] w-[25px] items-center justify-center font-bold">
              T{' '}
            </div>
            <div className="flex h-[25px] w-[25px] items-center justify-center font-bold">
              F{' '}
            </div>
            <div className="flex h-[25px] w-[25px] items-center justify-center font-bold">
              S{' '}
            </div>
          </div>
          <div className="grid grid-cols-7  grid-rows-5 gap-x-3 gap-y-3">
            {newDays.map((day: any, dayIdx: any) => {
              return (
                <div key={day.toString()}>
                  <button
                    onClick={() => {
                      console.log(day.toLocaleDateString())
                    }}
                  >
                    <DayButton day={dayIdx + 1} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function DayButton({ day }: { day?: number | null }) {
  return day ? (
    <div className="flex h-[25px] w-[25px] items-center justify-center rounded-lg hover:cursor-pointer hover:bg-sky-200">
      {day}
    </div>
  ) : (
    <div className="flex h-[25px] w-[25px] items-center justify-center rounded-lg"></div>
  )
}
