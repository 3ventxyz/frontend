import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TicketButton from '../../components/ticketButton'
import { TicketInterface } from '../../shared/interface/common'
import { EventInterface } from '../../shared/interface/common'

export default function Event() {
  // TODO: fetch event data
  // user id (this will probably be useContext)

  const [fetched, setFetched] = useState(false)
  const [event, setEvent] = useState<EventInterface>()
  const [selectedTicket, setSelectedTicket] = useState<TicketInterface>()
  const router = useRouter()

  // get event id
  const { eid } = router.query

  useEffect(() => {
    const fetchData = async () => {
      //get and set the data from firebase
      //get EventInterface for the correct eventID
      setEvent(undefined)
      setFetched(true)
    }
    if (!fetched) {
      fetchData()
    }
  }, [])

  const purchaseSelectedTier = () => {
    console.log(`==========Purchasing selected tier=========`)
    console.log(`ticketTitle: ${selectedTicket?.ticketTitle}`)
    console.log(`registeredUsers: ${selectedTicket?.registeredUsers}`)
    console.log(`tokenId: ${selectedTicket?.tokenId}`)
    console.log(`price: ${selectedTicket?.price}`)
    console.log(`=========`)
  }

  return (
    <div className="flex flex-row space-x-[291px] bg-dashboard px-[210px] pt-[85px] pb-[106px]">
      {/* TODO build the event page, after a user clicks the button 'create event' */}
      <div className="flex h-full flex-col">
        <div
          id="event-details"
          className="mb-[50px] space-y-[20px] text-[14px] font-medium leading-[19px]"
        >
          <h3>Event Title</h3>
          <div>
            Date and Time <br /> Address
          </div>

          <div className="h-[100px] w-[100px] rounded-[20px] bg-green-100">
            {' '}
            google map
          </div>
          <div>description of the event</div>
        </div>
        <div
          id="ticketbuilder"
          className="flex w-[373px] flex-col items-center space-y-[19px]"
        >
          {TicketListData.map((ticket: TicketInterface, index) => {
            return (
              <div key={ticket.tokenId}>
                <button
                  className="w-full"
                  onClick={() => {
                    setSelectedTicket(ticket)
                  }}
                >
                  <TicketButton ticket={ticket} />
                </button>
              </div>
            )
          })}
          <button
            onClick={() => {
              purchaseSelectedTier()
            }}
          >
            <div className="h-[40px]  w-[97px] rounded-xl bg-white px-[20px] py-[10px] text-[14px] font-semibold">
              Register
            </div>
          </button>
        </div>
      </div>
      <div className="h-full">
        <div className="h-[400px] w-[400px] rounded-[67px] bg-slate-400 px-[50px] py-[50px]">
          event img
        </div>
      </div>
    </div>
  )
}

const TicketListData = [
  {
    ticketTitle: 'Ticket 1',
    registeredUsers: '0/10000000000',
    tokenId: '#213',
    price: '$ 0.25'
  },
  {
    ticketTitle: 'Ticket 2',
    registeredUsers: '55/1000',
    tokenId: '#213',
    price: '$ 11.00'
  },
  {
    ticketTitle: 'Ticket 3',
    registeredUsers: '2/10',
    tokenId: '#213',
    price: '$ 30.00'
  },
  {
    ticketTitle: 'Ticket 4',
    registeredUsers: '3/3',
    tokenId: '#213',
    price: '$ 2,000.00'
  }
]