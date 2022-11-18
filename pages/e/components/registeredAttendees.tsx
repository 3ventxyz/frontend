import { DocumentData, QuerySnapshot } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import FetchRegisteredAttendees from '../../../services/fetch_registered_attendees'
import { RegisteredAttendeeInterface } from '../../../shared/interface/common'
import Image from 'next/image'
import Link from 'next/link'
export default function RegisteredAttendees({
  isMobile,
  eid = ''
}: {
  isMobile: boolean
  eid?: string
}) {
  const [attendees, setRegisteredAttendees] =
    useState<Array<RegisteredAttendeeInterface>>()
  const [isFetching, setIsFetching] = useState(true)
  /**
   * --pass the reference of the registered attendees collection.
   * fetch the docs and use each attendee doc to the registeredAtteendee component.
   **/

  useEffect(() => {
    const fetchData = async () => {
      const arrayOfAttendees: Array<RegisteredAttendeeInterface> = []
      var attendeesDocs: QuerySnapshot<DocumentData> =
        await FetchRegisteredAttendees(eid)
      //IMPORTANT move this to the event context for organizing.
      // console.dir(attendeesDocs.docs)
      for (const attendeeDoc of attendeesDocs.docs) {
        const newAttendee: RegisteredAttendeeInterface = {
          avatar: attendeeDoc.data().avatar,
          uid: attendeeDoc.data().uid,
          username: attendeeDoc.data().username
        }
        arrayOfAttendees.push(newAttendee)
      }
      setRegisteredAttendees(arrayOfAttendees)
      setIsFetching(false)
    }
    if (isFetching) {
      fetchData()
    }
  }, [])
  return isMobile ? (
    <div id="registered-attendees-mobile">
      <h4>Registered Attendees</h4>
      <div className="relative w-[320px] overflow-x-scroll">
        <div className="flex w-fit space-x-2">
          {attendees &&
            attendees.map((attendee, index) => {
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
        {attendees &&
          attendees.map((attendee, index) => {
            return <RegisteredAttendee key={attendee.uid} attendee={attendee} />
          })}
      </div>
    </div>
  )
}

/**pass the avatar, username to display, and the uid for accessing their profile pages. */
function RegisteredAttendee({
  attendee
}: {
  attendee: RegisteredAttendeeInterface
}) {
  return (
    <Link href={`/u/${attendee.uid}`}>
      <div className="flex h-[130px] space-y-[10px] w-[100px] flex-col items-center justify-center rounded-2xl  bg-[#cfe1ff] shadow-lg hover:shadow-xl transition-shadow hover:cursor-pointer">
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
