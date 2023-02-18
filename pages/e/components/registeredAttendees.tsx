import { useEffect } from 'react'
import { UserInterface } from '../../../shared/interface/common'
import Image from 'next/image'
import Link from 'next/link'
import useEventStatus from '../hooks/event/useEventStatus'
import useEventValues from '../hooks/event/useEventValues'
import { EventModalOptions } from '../../../shared/enums/enums'
import { useEvents } from '../../../contexts/events'
export default function RegisteredAttendees({
  isMobile,
  eid = ''
}: {
  isMobile: boolean
  eid?: string
}) {
  const [currStatus, { setIsFetchingAttendees }] = useEventStatus()
  const [currValues, { fetchAttendees }] = useEventValues()
  const events = useEvents()
  /**
   * --pass the reference of the registered attendees collection.
   * fetch the docs and use each attendee doc to the registeredAtteendee component.
   **/

  useEffect(() => {
    const fetchData = async () => {
      fetchAttendees(eid)
      setIsFetchingAttendees(false)
    }
    if (currStatus.isFetchingAttendees) {
      fetchData()
    }
  }, [])
  return isMobile ? (
    <div id="registered-attendees-mobile">
      <h4>Registered Attendees</h4>
      <div className="relative w-[320px] overflow-x-scroll">
        <div className="flex w-fit space-x-2">
          {currValues.attendees &&
            currValues.attendees.map((attendee, index) => {
              return (
                <RegisteredAttendee key={attendee.uid} attendee={attendee} />
              )
            })}
        </div>
      </div>
    </div>
  ) : (
    <div id="registered-attendees-web" className="space-y-2">
      <div className="flex items-center justify-between pr-[10px]">
        <h4>Registered Attendees</h4>
        <span
          onClick={() => {
            // onClick={() => {
            events.setDisplayModal(true)
            events.setEventModalOption(EventModalOptions.seeAllAttendees)
            // }}
          }}
          className="text-blue-600 hover:cursor-pointer hover:underline"
        >
          See all attendees
        </span>
      </div>
      <div className="mt-[15px] grid grid-cols-5 gap-y-1">
        {currValues.attendees &&
          currValues.attendees.map((attendee, index) => {
            return <RegisteredAttendee key={attendee.uid} attendee={attendee} />
          })}
      </div>
    </div>
  )
}

/**pass the avatar, username to display, and the uid for accessing their profile pages. */
function RegisteredAttendee({ attendee }: { attendee: UserInterface }) {
  return (
    <Link href={`/u/${attendee.uid}`}>
      <div className="flex h-[120px] w-[120px] flex-col items-center justify-center space-y-[0px] rounded-2xl  bg-white shadow-sm transition-shadow hover:cursor-pointer hover:shadow-md">
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
