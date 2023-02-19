import { EventInterface } from '../../../shared/interface/common'
import { IoLocationOutline } from 'react-icons/io5'
import { BsCalendar4 } from 'react-icons/bs'

export default function EventDetails({
  event
}: {
  event: EventInterface | null
}) {
  return (
    <div className="rounded-2xl  bg-white shadow-md">
      <LocationCard event={event} />
      <hr />
      <DateCard event={event} />
    </div>
  )
}

function LocationCard({ event }: { event: EventInterface | null }) {
  return (
    <div
      id="location-card"
      className="flex items-center space-x-3 px-[18px] py-[10px]"
    >
      <div className="h-[50px] w-[50px]">
        <IoLocationOutline className="h-[50px] w-[50px]" />
      </div>
      <div id="location-text " className="flex  flex-col items-start">
        <div className="text-[15px] font-bold">location:</div>
        <a
          rel="noreferrer noopener"
          target="_blank"
          href={`http://maps.google.com?q=${event?.location?.lat},${event?.location?.long}`}
          className={`text-[15px]" hover:underline`}
        >
          {event !== null ? event?.location.address : '...'}
        </a>
      </div>
    </div>
  )
}

/**TODO(2/2/2023). Marthel: Merge with the details component. So the UI looks all together. */
function DateCard({ event }: { event: EventInterface | null }) {
  return !event ? (
    <div id="date-card" className="flex h-[100px] space-x-1   px-[10px]  ">
      <div className="flex h-[100px] w-[60px] items-center justify-center">
        <BsCalendar4 className="h-[60px] w-[60px]" />
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
      className="flex items-center space-x-3 px-[18px] py-[10px] "
    >
      <div className="h-[50px] w-[50px] ">
        <BsCalendar4 className="h-[50px] w-[50px]" />
      </div>
      <div id="date-text" className="flex flex-col justify-center">
        <div className="text-[15px] font-bold">Date and time:</div>
        <div className="text-[15px]">
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
            ' to ' +
            event?.end_date.toLocaleString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }) +
            ', ' +
            event?.end_date.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
        </div>
      </div>
    </div>
  )
}
