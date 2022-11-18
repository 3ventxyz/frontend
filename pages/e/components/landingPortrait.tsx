import { EventInterface } from '../../../shared/interface/common'
import Link from 'next/link'
import Image from 'next/image'
import EventTile from '../../../components/eventTile'
export default function LandingPortrait({
  title,
  host,
  avatar,
  event
}: {
  title: string
  host: string
  avatar: string
  event: EventInterface | null
}) {
  return (
    <div className="flex h-[500px] w-[1050px] space-x-[60px] rounded-3xl bg-gray-400 px-[40px] py-[20px]">
      <div className="flex flex-col items-start justify-start">
        <div className="text-[50px] font-bold">{event?.title}</div>
        <DisplayHost
          event={event}
          profileUrlImg={''}
          hostName={'testUser123'}
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
