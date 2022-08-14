import { TicketInterface } from '../shared/interface/common'

export default function TicketButton({
  ticket,
  selected
}: {
  ticket: TicketInterface
  selected: boolean
}) {
  return (
    <div
      className={`${
        selected ? 'border-accent text-accent' : 'border-black text-black'
      } flex h-[76px] pt-[13px] pb-[14px] pl-[17px] w-[320px] flex-row items-center justify-between rounded-xl border bg-white px-[20px] md:w-[373px]`}
    >
      <div className="flex flex-col items-start">
        <div className="text-[14px] font-bold">{ticket.ticketTitle}</div>
        <div className="text-[10px]">{ticket.registeredUsers} remaining</div>
        <div className="text-[10px]"># {ticket.tokenId} required?</div>
      </div>
      <div className="text-[14px] font-bold">{ticket.price}</div>
    </div>
  )
}
