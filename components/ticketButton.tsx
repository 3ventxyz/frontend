import { TicketInterface } from '../shared/interface/common'

export default function TicketButton({ticket}:{ticket: TicketInterface}) {
  return (
    <div className="flex h-[76px] w-full flex-row items-center justify-between rounded-xl border border-black bg-white px-[20px]">
      <div>
        <div className="text-[14px] font-bold">{ticket.ticketTitle}</div>
        <div className="text-[10px]">{ticket.registeredUsers} remaining</div>
        <div className="text-[10px]"># {ticket.tokenId} required?</div>
      </div>
      <div className="text-[14px] font-bold">{ticket.price}</div>
    </div>
  )
}
