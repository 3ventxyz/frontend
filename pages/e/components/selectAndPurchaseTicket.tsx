// author:marthel
import Button from '../../../components/button'
import TicketButton from '../../../components/ticketButton'
import { TicketInterface } from '../../../shared/interface/common'

export default function SelectAndPurchaseTicket({
  ticketListData,
  selectedTicket,
  selectedIndex,
  setSelectedTicket,
  setSelectedIndex,
  setShowModal,
}: {
  ticketListData: Array<TicketInterface> | null
  selectedIndex: number | null
  setSelectedIndex: (index: number) => void
  selectedTicket: TicketInterface | null
  setSelectedTicket: (ticket: TicketInterface) => void
  setShowModal: (toggle: boolean) => void
}) {
  return (
    <div
      id="ticketbuilder"
      className="flex w-[320px] flex-col items-center space-y-[19px] md:w-[373px]"
    >
      {ticketListData?.map((ticket: TicketInterface, index) => {
        return (
          <button
            //TODO: step3.- here set the disable to true if the registeredUsers is equal to CapLimit.
            // a new parameter is not needed.
            disabled={false}
            key={index.toString()}
            className="w-full"
            onClick={() => {
              setSelectedTicket(ticket)
              setSelectedIndex(index)
            }}
          >
            <TicketButton
              key={index.toString()}
              selected={selectedIndex === index}
              ticket={ticket}
              isDisabled={false}
            />
          </button>
        )
      })}
      <Button
        text={'Register'}
        onClick={() => {
          setShowModal(true)
        }}
        active={selectedTicket !== null}
      />
    </div>
  )
}