import { TbPhoto, TbMap } from 'react-icons/tb'
import { EventInterface } from '../../../shared/interface/common'
import Image from 'next/image'

export default function LocationCard({
  event
}: {
  event: EventInterface | null
}) {
  return (
    <div
      id="location-card"
      className="flex h-[150px] space-x-3 shadow-md rounded-2xl bg-white"
    >
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
