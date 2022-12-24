import {
  eachDayOfInterval,
  startOfToday,
  endOfMonth,
  startOfMonth,
  format,
  endOfWeek,
  startOfWeek,
  isEqual,
  isToday,
  isSameMonth
} from 'date-fns'
import { useState } from 'react'

export default function LocalDatePicker() {
  /**TODO
   * Build a datepicker component with tailwindcss, where it displays the just a text input. Which
   * will work like a button.
   * when clicked on, it will show a modal component below it with a calendar to display the text.(DONE)
   * When the user clicks a date on it, it will select the date and the modal component will close and the input
   * will be updated with the new selected date.
   * 		Also when the user selects a date, the date picker will have a time stamp created.This timestamp will be
   * used and merged with the timestamp from the timepicker.There must be a way to merge or update the same timestamp variable.
   * one with date and the other with a time.
   */
  let today: Date = startOfToday()

  let newDays: Date[] = eachDayOfInterval({
    start: startOfWeek(startOfMonth(today)),
    end: endOfWeek(endOfMonth(today))
  })
  const [isActive, setIsActive] = useState(false)
  const [selectedDate, setSelectedDate] = useState(today)

  const setMonth = () => {}
  const setYear = () => {}
  const nextMonth = () => {}
  const prevMonth = () => {}

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
        } z-10 h-auto w-[260px] rounded-xl bg-white  py-[5px]`}
      >
        <div className="flex justify-evenly">
          <div className="hover:cursor-pointer">{'<'}</div>
          <div>{format(today, 'MMM yyyy')}</div>
          <div className="hover:cursor-pointer">{'>'}</div>
        </div>
        <hr />
        <div id="calendar" className="flex flex-col items-center space-y-2">
          <div id="row-1" className="flex space-x-2">
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
          <div className="grid grid-cols-7   gap-x-2 gap-y-2">
            {newDays.map((day: Date, dayIdx: number) => {
              return (
                <div key={day.toString()}>
                  <DayButton
                    day={day}
                    today={today}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function DayButton({
  day,
  today,
  selectedDate,
  setSelectedDate
}: {
  day?: Date | null
  today: Date
  selectedDate: Date
  setSelectedDate: (day: Date) => void
}) {
  return day ? (
    <button
      onClick={() => {
        /**prop drill for the setDate */
        console.log(day.toLocaleDateString())
        setSelectedDate(day)
      }}
    >
      {/* <div className="flex h-[25px] w-[25px] items-center justify-center rounded-lg hover:cursor-pointer hover:bg-sky-200"> */}
      <div
        // hover:bg-sky-200
        className={`
      flex
      h-[25px]
      w-[25px] 
      items-center 
      justify-center 
      rounded-lg 
      hover:cursor-pointer 

      ${isEqual(day, selectedDate) && 'text-white'}
      ${!isEqual(day, selectedDate) && isToday(day) && 'text-red-500'}
      ${
        !isEqual(day, selectedDate) &&
        !isToday(day) &&
        isSameMonth(day, today) &&
        'text-gray-900'
      }
      ${
        !isEqual(day, selectedDate) &&
        !isToday(day) &&
        !isSameMonth(day, today) &&
        'text-gray-400'
      }
      ${isEqual(day, selectedDate) && isToday(day) && 'bg-red-500'}
      ${isEqual(day, selectedDate) && !isToday(day) && 'bg-gray-900'} 
      ${!isEqual(day, selectedDate) && 'hover:bg-gray-200'} 
      ${(isEqual(day, selectedDate) || isToday(day)) && 'font-semibold'} 
      `}
      >
        {day.getDate()}
      </div>
    </button>
  ) : (
    <div className="flex h-[25px] w-[25px] items-center justify-center rounded-lg"></div>
  )
}
