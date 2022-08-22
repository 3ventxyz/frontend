// author: marthel
import Link from 'next/link'
import { TbPhotoOff, TbPhoto } from 'react-icons/tb'
import { EventInterface } from '../../../shared/interface/common'
import Image from 'next/image'

export default function EventsDisplay({
  title,
  route,
  query,
  eventsData,
  seeAllOption = false,
  showHeader = true,
  isFetching
}: {
  title: string
  route: string
  query: any
  eventsData: EventInterface[] | null
  seeAllOption?: boolean
  showHeader?: boolean
  isFetching: boolean
}) {
  const titleSectionStyle = 'text-[25px] md:text-[32px] font-bold'

  return (
    <div className="flex flex-col items-stretch space-y-[20px] ">
      {showHeader && (
        <div className="mx-auto flex w-full max-w-[1200px] flex-row items-end justify-between border-b border-disabled">
          <p className={titleSectionStyle}>{title}</p>
          {seeAllOption ? (
            <Link href={{ pathname: route, query: query }}>
              <div className="cursor-pointer hover:underline">see all</div>
            </Link>
          ) : (
            <></>
          )}
        </div>
      )}
      <div className="mx-auto flex max-w-[1200px] flex-row flex-wrap justify-evenly gap-[30px] 2xl:justify-start">
        {isFetching ? (
          <>
            <EventTile eventData={null} />
            <EventTile eventData={null} />
            <EventTile eventData={null} />
          </>
        ) : (
          eventsData &&
          eventsData.map((eventData, index) => {
            return <EventTile key={index.toString()} eventData={eventData} />
          })
        )}
      </div>
    </div>
  )
}

function EventTile({ eventData }: { eventData: EventInterface | null }) {
  return !eventData ? (
    <div className=" h-[460px] w-full max-w-[320px] animate-pulse cursor-pointer rounded-3xl bg-white sm:h-[524px] sm:w-[380px] sm:max-w-[380px]">
      <div className="relative h-[384px] max-h-[320px] w-full max-w-[380px] rounded-3xl bg-gray-300 sm:max-h-full">
        <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
          <TbPhoto className="h-[150px] w-[150px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-[7px] p-[20px]  ">
        <div className="h-[25px] w-auto rounded-md bg-gray-300 mt-[5px] mb-[5px]"></div>
        <div className="h-[13px] w-full rounded-md bg-gray-300"></div>
        <div className="h-[13px] w-full rounded-md bg-gray-300"></div>
        <div className="h-[13px] w-full rounded-md bg-gray-300"></div>
      </div>
    </div>
  ) : (
    <Link href={`/event/${eventData.id}`}>
      <div className=" h-[460px] w-full max-w-[320px] cursor-pointer rounded-3xl bg-white sm:h-[524px] sm:w-[380px] sm:max-w-[380px]">
        <div className="relative h-[384px] max-h-[320px] w-full max-w-[380px] rounded-3xl bg-gray-200 sm:max-h-full">
          {eventData.imgURL === '' ? (
            <div className="flex h-full w-full flex-col items-center justify-center text-gray-500">
              <TbPhotoOff className="h-[150px] w-[150px] " />
              <p>No image available</p>
            </div>
          ) : (
            <Image
              src={eventData.imgURL}
              // layout="fill"
              width={'384px'}
              height={'384px'}
              loading="lazy"
              objectFit="cover"
              className="rounded-3xl"
            />
          )}
        </div>
        <ul className="p-[20px]">
          <li className="... truncate text-[24px] font-bold">
            {eventData.eventTitle}
          </li>
          <li className="... truncate text-[14px]">{eventData.orgTitle}</li>
          <li className="... truncate text-[14px]">{eventData.date}</li>
          <li className="... truncate text-[14px]">{eventData.address}</li>
        </ul>
      </div>
    </Link>
  )
}
