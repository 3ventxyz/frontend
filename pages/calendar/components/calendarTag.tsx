export default function CalendarTag({
  date,
  eventName,
  num = 1
}: {
  date?: Date
  eventName?: string
  num?: number
}) {
  // Build a calendar Tag system that is used for
  //adding a sticker on the calendar, and indicate the
  //user what happen or will hapens to the followed event.
  switch (num) {
    case 1:
      return (
        <div className="rounded-sm bg-[#FF9191] text-[12px] font-bold tracking-widest text-white shadow-sm ">
          Full Event
        </div>
      )
    case 2:
      return (
        <div className="rounded-sm bg-[#73ABFF] text-[12px] font-bold tracking-wide text-white shadow-sm hover:cursor-pointer hover:shadow-md">
          Registered Event
        </div>
      )
    case 3:
      return (
        <div className="rounded-sm bg-[#A1EE72] text-[12px] font-bold tracking-wide text-white shadow-sm hover:cursor-pointer hover:shadow-md">
          Current Event
        </div>
      )

    default:
      return (
        <div className="rounded-sm bg-black text-[12px] font-bold tracking-widest text-white shadow-sm hover:cursor-pointer hover:shadow-md">
          Event No 5
        </div>
      )
  }
}
