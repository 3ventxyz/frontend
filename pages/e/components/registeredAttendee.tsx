import { UserInterface } from '../../../shared/interface/common'
import Image from 'next/image'
import Link from 'next/link'

/**pass the avatar, username to display, and the uid for accessing their profile pages. */
export default function RegisteredAttendee({
  attendee
}: {
  attendee: UserInterface
}) {
  return (
    <Link href={`/u/${attendee.uid}`}>
      <div className="flex h-[120px] w-[120px] flex-col items-center justify-center space-y-[0px] rounded-2xl border-[0.5px] border-solid border-gray-300  bg-white shadow-sm transition-shadow hover:cursor-pointer hover:shadow-md">
        <div className="relative h-[50px] w-[50px] rounded-full bg-green-200">
          <Image
            src={attendee.avatar ?? ''}
            layout="fill"
            loading="lazy"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div
          className={`... truncate ${
            attendee.username.length > 8 ? 'w-[80px]' : 'w-fit'
          }`}
        >
          {attendee.username}
        </div>
        <div
          className={`
			   w-fit text-[14px] font-bold
			`}
        >
          attendee
        </div>
      </div>
    </Link>
  )
}
