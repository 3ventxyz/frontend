import { EventInterface, UserInterface } from '../../../shared/interface/common'
import Link from 'next/link'
import Image from 'next/image'
import EventTile from '../../../components/eventTile'
export default function LandingPortrait({
  event,
  host
}: {
  event: EventInterface | null
  host: UserInterface | null
}) {
  return !host && !event ? (
    <div className="flex h-[500px] w-[1050px] space-x-[60px] rounded-3xl bg-gray-400 px-[40px] py-[20px]">
      <div className="flex w-full flex-col items-start justify-start">
        <div className="mt-[8px] mb-[12px] h-[55px] w-[550px] animate-pulse rounded-lg bg-gray-300 text-[50px] font-bold"></div>
        <DisplayHost event={event} profileUrlImg={''} hostName={'...'} />
      </div>
      <div>
        <EventTile eventData={event} eventPageMode={true} />
      </div>
    </div>
  ) : (
    <div className="flex h-[500px] w-[1050px] space-x-[60px] rounded-3xl bg-gray-400 px-[40px] py-[20px]">
      <div className="flex w-full flex-col items-start justify-start">
        <div className="text-[50px] font-bold">{event?.title}</div>
        <DisplayHost
          event={event}
          profileUrlImg={host?.avatar !== undefined ? host?.avatar : ''}
          hostName={host?.username !== undefined ? host?.username : ''}
        />
      </div>
      <div>
        <EventTile eventData={event} eventPageMode={true} />
      </div>
    </div>
  )
}

function DisplayHost({
  event,
  profileUrlImg,
  hostName
}: {
  event: EventInterface | null
  profileUrlImg: string
  hostName: string
}) {
  return (
    <Link href={`/u/${event?.uid}`}>
      <div className="flex h-auto w-fit cursor-pointer flex-row items-center space-x-2  ">
        {profileUrlImg ? (
          <Image
            src={profileUrlImg}
            layout="fixed"
            width="54px"
            height="54px"
            loading="lazy"
            className="rounded-full bg-gray-200"
          />
        ) : (
          <div className="h-[54px] w-[54px] rounded-full bg-gray-200" />
        )}
        <div className="flex h-fit flex-col space-y-0">
          <div className="h-[22px] ">
            <b className=" ">Host:</b>
          </div>
          <div>
            <p className="">{hostName}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
