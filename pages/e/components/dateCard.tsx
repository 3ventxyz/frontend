import { EventInterface } from '../../../shared/interface/common'
import { BsCalendar3 } from 'react-icons/bs'

export default function DateCard({ event }: { event: EventInterface | null }) {
  return (
    <div
      id="date-card"
      className="flex h-[100px]  space-x-3 rounded-2xl bg-white px-[10px]"
    >
      <div className="flex h-[100px] w-[60px] items-center justify-center">
        <BsCalendar3 className="h-[60px] w-[60px]" />
      </div>
      <div id="date-text" className="flex flex-col justify-center">
        <div className="text-[24px] font-bold ">Date and time:</div>
        {/* <div>Wed, Nov 16, 2022, 7:00 PM - Fri, Nov 18, 2022, 8:00 PM PST</div> */}
		<div>{event?.start_date.toLocaleString()+" -"}</div>
        <div>{event?.end_date.toLocaleString()}</div>
	  </div>
    </div>
  )
}
