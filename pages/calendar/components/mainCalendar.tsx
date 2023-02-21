export default function MainCalendar() {
  return (
    <div id="main-column" className="h-[750px] w-[850px] space-y-[3px]">
      <div className="flex justify-evenly space-x-5 rounded-lg bg-black shadow-md py-[3px] text-[20px] font-bold text-white">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tues</div>
        <div>Wed</div>
        <div>Thurs</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="grid w-full grid-cols-7  gap-y-[1px]">
        {[...Array(35).keys()].map((index) => {
          return <CalendarDay dayNumber={index} />
        })}
      </div>
    </div>
  )
}

function CalendarDay({
  dayNumber = 0,
  tags = []
}: {
  dayNumber?: number
  tags?: Array<string>
}) {
  //TODO build a calendar day block, that
  //holds the day number, the events that will be stored.
  return (
    <div className="flex h-[125px] w-[120px] flex-col items-end space-y-[1px] rounded-2xl border bg-white shadow-md">
      <div className=" mr-[3px] mt-[3px] flex h-[25px] w-[25px] items-center justify-center rounded-3xl  bg-black text-[12px] font-bold text-white">
        <p>{dayNumber}</p>
      </div>
      <div id="tags" className="h-[85px] w-full space-y-[4px] px-[3px]">
        <div className="rounded-sm bg-[#FF9191] text-[12px] font-bold tracking-widest text-white shadow-sm ">
          Full Event
        </div>
        <div className="rounded-sm bg-black text-[12px] font-bold tracking-widest text-white shadow-sm hover:shadow-md hover:cursor-pointer">
          Event No 5
        </div>
        <div className="rounded-sm bg-[#73ABFF] text-[12px] font-bold tracking-wide text-white shadow-sm hover:shadow-md hover:cursor-pointer">
          Registered Event
        </div>
        <div className="rounded-sm bg-[#73ABFF] text-[12px] font-bold tracking-wide text-white shadow-sm hover:shadow-md hover:cursor-pointer">
          Registered Event
        </div>
      </div>
    </div>
  )
}
