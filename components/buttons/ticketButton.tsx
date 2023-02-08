import { TicketInterface } from '../../shared/interface/common'


interface TicketButtonProps{
  /**
   * Ticket data interface:
   * 
   * -ticketTitle: title of the ticket 
   * 
   * -registeredUsers: number of registered attendees
   * 
   * -capLimit: maximum capacity of registered attendees
   * 
   * -tokenId: token id for wallet.
   * 
   * -price: price of the ticket.
   */
  ticket: TicketInterface | null
  /**
   * displays the selected palette color.
   */
  selected: boolean
  /**
   * displays the disabled palette color.
   */
  isDisabled: boolean
}

/**
 * Ticket Button. It will display and indicate the user the ticket available.
 */
export function TicketButton({
  ticket,
  selected,
  isDisabled
}:
TicketButtonProps) {
  return !isDisabled ? (
    <div
      className={`${
        selected ? 'border-accent text-accent' : 'border-black text-black'
      } flex h-[76px] w-[320px] flex-row items-center justify-between rounded-xl border bg-white px-[20px] pt-[13px] pb-[14px] pl-[17px] md:w-[373px]`}
    >
      <div className="flex flex-col items-start">
        <div className="text-[14px] font-bold">
          {ticket?.ticketTitle || 'NULL TICKET TITLE'}
        </div>
        <div className="text-[10px]">
          {ticket?.registeredUsers || '0'}/{ticket?.capLimit || '0'} remaining
        </div>
        {/* <div className="text-[10px]"># {ticket?.tokenId || '0x000'} required?</div> */}
      </div>
      <div className="text-[14px] font-bold">
        $ {ticket?.price.toFixed(2) || '0.00'}
      </div>
    </div>
  ) : (
    <div
      className={`
        flex h-[76px]
      w-[320px] flex-row items-center justify-between rounded-xl border border-disabled bg-white px-[20px] pt-[13px] pb-[14px] pl-[17px] text-disabled md:w-[373px]`}
    >
      <div className="flex flex-col items-start">
        <div className="text-[14px] font-bold">
          {ticket?.ticketTitle || 'NULL TICKET TITLE'} (Sold Out)
        </div>
        <div className="text-[10px]">
          {ticket?.registeredUsers || '0'}/{ticket?.capLimit || '0'} Max Capped
        </div>
        {/* <div className="text-[10px]"># {ticket?.tokenId || '0x000'} required?</div> */}
      </div>
      <div className="text-[14px] font-bold">
        $ {ticket?.price.toFixed(2) || '0.00'}
      </div>
    </div>
  )
}
