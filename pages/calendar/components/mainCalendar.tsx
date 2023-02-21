export default function MainCalendar() {
  // TODO build the main calendar
  return (
    <div id="main-column" className="h-[750px] w-[850px] bg-sky-400">
      <div className="flex justify-evenly space-x-5 rounded-lg bg-black py-[3px] text-[20px] font-bold text-white">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tues</div>
        <div>Wed</div>
        <div>Thurs</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="grid w-full grid-cols-7 gap-x-1 gap-y-1 ">
        <CalendarDay />
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
    <div className="flex h-[115px] w-[125px] flex-col items-end rounded-2xl bg-white">
      <div className=" mr-[3px] mt-[3px] flex h-[25px] w-[25px] items-center justify-center rounded-3xl  bg-black text-[12px] font-bold text-white">
        <p>31</p>
      </div>
      <div id="tags" className="h-[85px] w-full bg-red-300">
        <div></div>
      </div>
    </div>
  )
}
