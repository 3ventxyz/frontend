import { EventInterface } from '../../../shared/interface/common'
import { BsCalendar3 } from 'react-icons/bs'

export default function DateCard({ event }: { event: EventInterface | null }) {
  return !event ? (
    <div
      id="date-card"
      className="flex h-[100px] space-x-1 rounded-2xl bg-white px-[8px] shadow-md"
    >
      <div className="flex h-[100px] w-[60px] items-center justify-center">
        <BsCalendar3 className="h-[60px] w-[60px]" />
      </div>
      <div id="date-text" className="flex flex-col justify-center">
        <div className="text-[24px] font-bold ">Date and time:</div>
        <div>
          <div>{'...'}</div>
          <div>{'...'}</div>
        </div>
      </div>
    </div>
  ) : (
    <div
      id="date-card"
      className="flex h-[100px] space-x-1 rounded-2xl bg-white px-[8px] shadow-md"
    >
      <div className="flex h-[100px] w-[60px] items-center justify-center">
        <BsCalendar3 className="h-[60px] w-[60px]" />
      </div>
      <div id="date-text" className="flex flex-col justify-center">
        <div className="text-[24px] font-bold ">Date and time:</div>
        <div>
          {event?.start_date.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) +
            ', ' +
            event?.start_date.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            }) +
            ' - ' +
            event?.end_date.toLocaleString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }) +
            ', ' +
            event?.end_date.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short'
            })}
        </div>
      </div>
    </div>
  )
}
