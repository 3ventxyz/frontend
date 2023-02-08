import { DocumentData, QuerySnapshot } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import FetchRegisteredAttendees from '../../../services/fetch_registered_attendees'
import { UserInterface } from '../../../shared/interface/common'
import Image from 'next/image'
import Link from 'next/link'
import useEventStatus from '../hooks/event/useEventStatus'
import useEventValues from '../hooks/event/useEventValues'
export default function RegisteredAttendees({
  isMobile,
  eid = ''
}: {
  isMobile: boolean
  eid?: string
}) {
  const [currStatus, { setIsFetchingAttendees }] = useEventStatus()
  const [currValues, { fetchAttendees }] = useEventValues()
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
    <div id="registered-attendees-web">
      <h4>Registered Attendees</h4>
      <div className="mt-[15px] grid grid-cols-5 gap-y-5">
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
      <div className="flex h-[130px] w-[100px] flex-col items-center justify-center space-y-[10px] rounded-2xl  bg-[#cfe1ff] shadow-lg transition-shadow hover:cursor-pointer hover:shadow-xl">
        <div className="relative h-[80px] w-[80px] rounded-full bg-green-200">
          <Image
            src={attendee.avatar ?? ''}
            layout="fill"
            loading="lazy"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div
          className={`... truncate  ${
            attendee.username.length > 10 ? 'w-[80px]' : 'w-fit'
          }`}
        >
          {attendee.username}
        </div>
      </div>
    </Link>
  )
}
