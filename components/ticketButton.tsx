import { TicketInterface } from '../shared/interface/common'

export default function TicketButton({
  ticket,
  selected
}: {
  ticket: TicketInterface | null
  selected: boolean
}) {
  return (
    <div
      className={`${
        selected ? 'border-accent text-accent' : 'border-black text-black'
      } flex h-[76px] pt-[13px] pb-[14px] pl-[17px] w-[320px] flex-row items-center justify-between rounded-xl border bg-white px-[20px] md:w-[373px]`}
    >
      <div className="flex flex-col items-start">
        <div className="text-[14px] font-bold">{ticket?.ticketTitle || 'NULL TICKET TITLE'}</div>
        <div className="text-[10px]">{ticket?.registeredUsers || '0'}/{ticket?.capLimit || '0'} remaining</div>
        {/* <div className="text-[10px]"># {ticket?.tokenId || '0x000'} required?</div> */}
      </div>
      <div className="text-[14px] font-bold">$ {ticket?.price.toFixed(2) || '0.00'}</div>
    </div>
  )
}
