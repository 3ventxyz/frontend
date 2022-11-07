import { useEffect, useState } from "react"

export default function RegisteredAttendees({
  isMobile, eid=''
}: {
  isMobile: boolean,
  eid?:string
}) {
  const [attendees, setRegisteredAttendees] = useState<any>();
  /**
   * --pass the reference of the registered attendees collection.
   * fetch the docs and use each attendee doc to the registeredAtteendee component.
   **/

  useEffect(()=>{},[])
  return isMobile ? (
    <div id="registered-attendees-mobile">
      <h4>Registered Attendees</h4>
      <div className="relative w-[320px] overflow-x-scroll">
        <div className="flex  w-fit space-x-2">
          <RegisteredAttendee />
          <RegisteredAttendee />
          <RegisteredAttendee />
          <RegisteredAttendee />
          <RegisteredAttendee />
          <RegisteredAttendee />
        </div>
      </div>
    </div>
  ) : (
    <div id="registered-attendees-web">
      <h4>Registered Attendees</h4>
      <div className="mt-[15px] grid grid-cols-4 gap-x-2 gap-y-2 ">
        <RegisteredAttendee />
        <RegisteredAttendee />
        <RegisteredAttendee />
        <RegisteredAttendee />
        <RegisteredAttendee />
        <RegisteredAttendee />
      </div>
    </div>
  )
}

/**pass the avatar, username to display, and the uid for accessing their profile pages. */
function RegisteredAttendee() {
  return (
    <div className="flex h-[130px] w-[100px] flex-col items-center justify-center truncate rounded-2xl bg-gray-200">
      <div className="h-[80px] w-[80px] rounded-full bg-green-200  ">
        avatar
      </div>
      <p>hello wir</p>
    </div>
  )
}
