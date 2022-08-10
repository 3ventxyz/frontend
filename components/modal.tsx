import { ReactElement } from "react"
import { TicketInterface } from "../shared/interface/common"

// author: marthel
export default function Modal({
  visible,
  onClose,
  children,
  ticket
}: {
  visible: boolean
  onClose: () => void,
  children:ReactElement,
  ticket:TicketInterface
}):JSX.Element {
  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') {
      onClose()
    }
  }
  if (!visible) return <></>
  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="backdrop-blue-sm fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
    >
      <div className="w-[800px] h-[350px] rounded bg-white p-2 shadow-xl">
        <div>{ticket.ticketTitle}</div>
        <div>{ticket.price}</div>
        <div>{ticket.registeredUsers}</div>
        <div>{ticket.disabled}</div>
        {/* <div>{ticket.ticketTitle}</div> */}
      </div>
    </div>
  )
}
