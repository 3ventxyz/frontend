import { EventInterface } from '../../../shared/interface/common'
import { TbMap } from 'react-icons/tb'
import Image from 'next/image'
import { BsCalendar3 } from 'react-icons/bs'

export default function EventDetails({ event }: { event: EventInterface | null }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm">
      <div className="text-[28px] font-bold ">Date and place</div>
      <hr />
      <LocationCard event={event} />
      <hr />
      <DateCard event={event} />
    </div>
  )
}

/**TODO(2/2/2023) Marthel: make the component expandable, based from the length of the address.
 * Based from the number of characters, including spaces, there's going to be an increase of heigth for
 * the whole div.
 */
function LocationCard({ event }: { event: EventInterface | null }) {
  return (
    <div id="location-card" className="flex h-[150px] space-x-3  px-[10px]  ">
      {event != null ? (
        <div className="relative h-[150px] w-[150px] rounded-2xl ">
          <a
            rel="noreferrer noopener"
            target="_blank"
            href={`http://maps.google.com?q=${event?.location?.lat},${event?.location?.long}`}
          >
            <Image
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${event?.location?.lat},${event?.location?.long}&zoom=15&size=300x300&markers=size:mid%color:blue%7Clabel:E%7C${event?.location?.lat},${event?.location?.long}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
              layout="fill"
              loading="lazy"
              objectFit="cover"
              className="rounded-[20px]"
            />
          </a>
        </div>
      ) : (
        <div className="flex h-[150px] w-[150px] items-center justify-center rounded-2xl bg-green-200">
          <TbMap className="h-[50px] w-[50px]" />
        </div>
      )}

      <div id="location-text " className="flex w-[100px] flex-col items-center">
        <div className="text-[24px] font-bold">location</div>
        <div className="text-wrap">
          {event !== null ? event?.location.address : '...'}
        </div>
      </div>
    </div>
  )
}

/**TODO(2/2/2023). Marthel: Merge with the details component. So the UI looks all together. */
function DateCard({ event }: { event: EventInterface | null }) {
  return !event ? (
    <div
      id="date-card"
      className="flex h-[100px] space-x-1  bg-white px-[10px]  "
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
      className="flex h-[100px] space-x-1 rounded-2xl bg-white px-[8px] "
    >
      <div className="flex h-[100px] w-[60px] items-center justify-center">
        <BsCalendar3 className="h-[60px] w-[60px]" />
      </div>
      <div id="date-text" className="flex flex-col justify-center">
        <div className="text-[24px] font-bold ">Date and time:</div>
        <div>
          {
          event?.start_date.toLocaleString('en-US', {
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
              minute: '2-digit',
            })}
        </div>
      </div>
    </div>
  )
}
