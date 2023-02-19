import { useEffect } from 'react'

import useEventStatus from '../hooks/event/useEventStatus'
import useEventValues from '../hooks/event/useEventValues'
import { EventModalOptions } from '../../../shared/enums/enums'
import { useEvents } from '../../../contexts/events'
import RegisteredAttendee from './registeredAttendee'
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
            events.setDisplayModal(true)
            events.setEventModalOption(EventModalOptions.seeAllAttendees)
          }}
          className="text-blue-600 hover:cursor-pointer hover:underline"
        >
          See all attendees
        </span>
      </div>
      <div className="mt-[15px] grid grid-cols-5  gap-y-1">
        {currValues.attendees &&
          currValues.attendees.map((attendee, index) => {
            return <RegisteredAttendee key={attendee.uid} attendee={attendee} />
          })}
      </div>
    </div>
  )
}
