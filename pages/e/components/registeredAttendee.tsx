export default function RegisteredAttendees({
  isMobile
}: {
  isMobile: boolean
}) {
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
