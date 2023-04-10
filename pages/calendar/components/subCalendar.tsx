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

export default function SubCalendar({
  selectedDate,
  setDate,
  name
}: {
  selectedDate: Date
  setDate: (name: string, date: Date) => void
  name: string
}) {
  //data variables
  let today: Date = startOfToday()
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
      <div
        className={` z-10 h-auto w-[260px] rounded-xl bg-white  py-[5px] shadow-lg`}
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
          <div className={`grid grid-cols-7 gap-x-2 gap-y-2`}>
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
                    setDate={setDate}
                    name={name}
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
  name,
  setDate
}: {
  day?: Date | null
  today: Date
  firstDayCurrentMonth: Date
  selectedDate: Date
  name: string
  setDate: (name: string, day: Date) => void
}) {
  return day ? (
    <button
      onClick={() => {
        setDate(name, day)
      }}
    >
      <div
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