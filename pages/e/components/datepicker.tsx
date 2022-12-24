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
  isSameMonth,
  parse,
  add,
  sub,
  getDay
} from 'date-fns'
import { useState } from 'react'

export default function LocalDatePicker({
  date,
  setDate
}: {
  date: Date
  setDate: (date: Date) => void
}) {
  let today: Date = startOfToday()

  const [isActive, setIsActive] = useState(false)
  const [selectedDate, setSelectedDate] = useState(today)
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7'
  ]

  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
  let newDays: Date[] = eachDayOfInterval({
    start: startOfWeek(startOfMonth(firstDayCurrentMonth)),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth))
  })
  const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }
  const prevMonth = () => {
    let firstDayPrevMonth = sub(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayPrevMonth, 'MMM-yyyy'))
  }

  return (
    <div className="relative">
      <input
        onClick={(e) => {
          /** pass the div from the outside place and update */
          setIsActive(!isActive)
        }}
        className={`focus:shadow-outline leading-0 z-0 block w-[150px] max-w-[400px] rounded-lg border-[1.5px] bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
        type="text"
        placeholder={format(selectedDate, 'dd/MM/yyyy')}
        disabled={false}
      />
      <div
        className={`${
          isActive ? 'absolute' : 'hidden'
        } z-10 h-auto w-[260px] rounded-xl bg-white  py-[5px]`}
      >
        <div className="flex justify-evenly">
          <button
            onClick={() => {
              prevMonth()
            }}
          >
            {'<'}
          </button>
          <div>{format(firstDayCurrentMonth, 'MMM yyyy')}</div>
          <button
            onClick={() => {
              nextMonth()
            }}
          >
            {'>'}
          </button>
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
          {/* <div className="grid grid-cols-7   gap-x-2 gap-y-2"> */}
          <div className={`grid grid-cols-7   gap-x-2 gap-y-2`}>
            {newDays.map((day: Date, dayIdx: number) => {
              return (
                <div
                  key={day.toString()}
                  className={`${dayIdx === 0 && colStartClasses[getDay(day)]}`}
                >
                  <DayButton
                    day={day}
                    today={today}
                    firstDayCurrentMonth={firstDayCurrentMonth}
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
  firstDayCurrentMonth,
  selectedDate,
  setSelectedDate
}: {
  day?: Date | null
  today: Date
  firstDayCurrentMonth: Date
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
        isSameMonth(day, firstDayCurrentMonth) &&
        'text-gray-900'
      }
      ${
        !isEqual(day, selectedDate) &&
        !isToday(day) &&
        !isSameMonth(day, firstDayCurrentMonth) &&
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
